frappe.ui.form.on('Constipation', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_constipation_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_vwfw': '#FF5722',
                'check_inid': '#4CAF50',
                'check_qeqi': '#2196F3'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes
    blood_stool(frm) {
        show_red_flag(frm, 'blood_stool');
        frm.trigger("toggle_constipation_field");
    },
    not_able_to_pass_the_gas(frm) {
        show_red_flag(frm, 'not_able_to_pass_the_gas');
        frm.trigger("toggle_constipation_field");
    },
    sever_abdominal_pain(frm) {
        show_red_flag(frm, 'sever_abdominal_pain');
        frm.trigger("toggle_constipation_field");
    },
    recent_loss_of_appetite_or_weight_loss(frm) {
        show_red_flag(frm, 'recent_loss_of_appetite_or_weight_loss');
        frm.trigger("toggle_constipation_field");
    },
    recent_onset_of_constipation(frm) {
        show_red_flag(frm, 'recent_onset_of_constipation');
        frm.trigger("toggle_constipation_field");
    },
    none_constipation(frm) {
        show_red_flag(frm, 'none_constipation');
        frm.trigger("toggle_constipation_field");
    },

    // Optional age field handler
    age(frm) {
        show_red_flag(frm, 'recent_onset_of_constipation');
        frm.trigger("toggle_constipation_field");
    },

    constipation(frm) {
        frm.trigger("toggle_sections");
    },

    toggle_constipation_field(frm) {
        let show = (
            frm.doc.blood_stool ||
            frm.doc.not_able_to_pass_the_gas ||
            frm.doc.sever_abdominal_pain ||
            frm.doc.recent_loss_of_appetite_or_weight_loss ||
            frm.doc.recent_onset_of_constipation ||
            frm.doc.none_constipation
        );
        frm.toggle_display("constipation", show);
        if (show) {
            frm.set_df_property("constipation", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("constipation", "options", ["Yes", "No"]);
        } else {
            frm.set_value("constipation", "");
        }
    },

    toggle_sections(frm) {
        let show_sections = (frm.doc.constipation === "Yes");
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_piry", show_sections);
        frm.toggle_display("section_break_cvvz", show_sections);
        frm.toggle_display("check_vwfw", show_sections);
        frm.toggle_display("check_inid", show_sections);
        frm.toggle_display("check_qeqi", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("constipation field value:", frm.doc.constipation); // Debugging
        if (frm.doc.constipation === "Yes") {
            console.log("check_vwfw:", frm.doc.check_vwfw); // Debugging
            console.log("check_inid:", frm.doc.check_inid); // Debugging
            console.log("check_qeqi:", frm.doc.check_qeqi); // Debugging
            if (!frm.doc.check_vwfw) {
                frappe.throw("You didn’t complete Present Complaints Section");
            }
            if (!frm.doc.check_inid) {
                frappe.throw("You didn’t complete Personal and Lifestyle History Section");
            }
            if (!frm.doc.check_qeqi) {
                frappe.throw("You didn’t complete Occupation History Section");
            }
        }
    }
});

function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_vwfw': '#FF5722', // Deep Orange
        'check_inid': '#4CAF50', // Green
        'check_qeqi': '#2196F3'  // Blue
    };

    Object.keys(checkboxColors).forEach(fieldname => {
        if (!frm.fields_dict[fieldname]) {
            console.warn(`Field ${fieldname} not found in form`);
            return;
        }
        const checkbox = frm.fields_dict[fieldname].$wrapper.find('input[type="checkbox"]');
        if (checkbox && checkbox.length > 0) {
            console.log(`Found checkbox for ${fieldname}`);
            checkbox.removeAttr('style');
            const wrapper = checkbox.parent();
            wrapper.css({
                'display': 'inline-flex',
                'align-items': 'center'
            });
            checkbox.css({
                'appearance': 'none',
                'width': '16px',
                'height': '16px',
                'border': '2px solid #ccc',
                'border-radius': '4px',
                'margin-right': '5px',
                'cursor': 'pointer',
                'background-color': checkbox.is(':checked') ? checkboxColors[fieldname] : '#fff',
                'transition': 'background-color 0.3s'
            });
            checkbox.off('change').on('change', function() {
                $(this).css('background-color', this.checked ? checkboxColors[fieldname] : '#fff');
                $(this).next('label').css('color', this.checked ? checkboxColors[fieldname] : '');
            });
            checkbox.trigger('change');
        } else {
            console.log(`Checkbox not found for ${fieldname}`);
        }
    });
}

function show_red_flag(frm, fieldname) {
    const red_flags = {
        blood_stool: {
            refer: "Health centre/PHC/CHC",
            message: "It could be hemorrhoids or tumor."
        },
        not_able_to_pass_the_gas: {
            refer: "Health centre/PHC/CHC",
            message: "It could be Tumor."
        },
        sever_abdominal_pain: {
            refer: "Health centre/PHC/CHC",
            message: "It could be Tumor."
        },
        recent_loss_of_appetite_or_weight_loss: {
            refer: "Health centre/PHC/CHC",
            message: "It could be Tumor."
        },
        recent_onset_of_constipation: {
            refer: frm.doc.age && frm.doc.age < 18 ? "Pediatric specialist" : "Health centre/PHC/CHC",
            message: frm.doc.age && frm.doc.age < 18 ? "Possible pediatric issue requiring specialist." : "It could be Tumor."
        },
        none_constipation: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_constipation") {
        let info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: "Red Flag Warning",
                message: "Refer to: " + info.refer + "<br>Note: " + info.message,
                indicator: "red"
            });
        }
    }
}
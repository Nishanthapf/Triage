frappe.ui.form.on('Postnatal Care', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_postnatal_care_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_wugd': '#FF5722',
                'check_fddd': '#4CAF50',
                'check_qzoy': '#2196F3'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control postnatal_care field visibility
    breathlessness(frm) {
        show_red_flag(frm, 'breathlessness');
        frm.trigger("toggle_postnatal_care_field");
    },
    mental_issues(frm) {
        show_red_flag(frm, 'mental_issues');
        frm.trigger("toggle_postnatal_care_field");
    },
    pain_breast(frm) {
        show_red_flag(frm, 'pain_breast');
        frm.trigger("toggle_postnatal_care_field");
    },
    none_mother(frm) {
        show_red_flag(frm, 'none_mother');
        frm.trigger("toggle_postnatal_care_field");
    },
    child_feeding_is_reduced(frm) {
        show_red_flag(frm, 'child_feeding_is_reduced');
        frm.trigger("toggle_postnatal_care_field");
    },
    child_is_drowsy(frm) {
        show_red_flag(frm, 'child_is_drowsy');
        frm.trigger("toggle_postnatal_care_field");
    },
    respiratory_rate_is_more_than__60_beats_per_minute(frm) {
        show_red_flag(frm, 'respiratory_rate_is_more_than__60_beats_per_minute');
        frm.trigger("toggle_postnatal_care_field");
    },
    chest_indrawing(frm) {
        show_red_flag(frm, 'chest_indrawing');
        frm.trigger("toggle_postnatal_care_field");
    },
    abdominal_distension(frm) {
        show_red_flag(frm, 'abdominal_distension');
        frm.trigger("toggle_postnatal_care_field");
    },
    jaundice(frm) {
        show_red_flag(frm, 'jaundice');
        frm.trigger("toggle_postnatal_care_field");
    },
    child_not_passing_urine_and_stool(frm) {
        show_red_flag(frm, 'child_not_passing_urine_and_stool');
        frm.trigger("toggle_postnatal_care_field");
    },
    fever_more_than_normal(frm) {
        show_red_flag(frm, 'fever_more_than_normal');
        frm.trigger("toggle_postnatal_care_field");
    },
    cough_or_cold(frm) {
        show_red_flag(frm, 'cough_or_cold');
        frm.trigger("toggle_postnatal_care_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_postnatal_care_field");
    },

    // Postnatal care select → controls section visibility
    postnatal_care(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show postnatal_care field if any red flag condition is met
    toggle_postnatal_care_field(frm) {
        let show = (
            frm.doc.breathlessness ||
            frm.doc.mental_issues ||
            frm.doc.pain_breast ||
            frm.doc.none_mother ||
            frm.doc.child_feeding_is_reduced ||
            frm.doc.child_is_drowsy ||
            frm.doc.respiratory_rate_is_more_than__60_beats_per_minute ||
            frm.doc.chest_indrawing ||
            frm.doc.abdominal_distension ||
            frm.doc.jaundice ||
            frm.doc.child_not_passing_urine_and_stool ||
            frm.doc.fever_more_than_normal ||
            frm.doc.cough_or_cold ||
            frm.doc.none
        );
        frm.toggle_display("postnatal_care", show);
        if (show) {
            frm.set_df_property("postnatal_care", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("postnatal_care", "options", ["Yes", "No"]);
        } else {
            frm.set_value("postnatal_care", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.postnatal_care === "Yes");
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("section_break_fbke", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("check_wugd", show_sections);
        frm.toggle_display("check_fddd", show_sections);
        frm.toggle_display("check_qzoy", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("postnatal_care field value:", frm.doc.postnatal_care); // Debugging
        if (frm.doc.postnatal_care === "Yes") {
            console.log("check_wugd:", frm.doc.check_wugd); // Debugging
            console.log("check_fddd:", frm.doc.check_fddd); // Debugging
            console.log("check_qzoy:", frm.doc.check_qzoy); // Debugging
            if (!frm.doc.check_wugd) {
                frappe.throw("You didn’t complete Present History Section");
            }
            if (!frm.doc.check_fddd) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_qzoy) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_wugd': '#FF5722', // Deep Orange
        'check_fddd': '#4CAF50', // Green
        'check_qzoy': '#2196F3'  // Blue
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

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        breathlessness: {
            refer: "Tertiary health care centre",
            message: "It could be an infection/PID/improper evacuation of placenta."
        },
        mental_issues: {
            refer: "Tertiary health care centre",
            message: "Post partum depression."
        },
        pain_breast: {
            refer: "Health centre/PHC/CHC",
            message: "Pain in the breast while feeding or cracked/sore nipple."
        },
        none_mother: {
            refer: "No referral needed",
            message: "No critical symptoms detected for the mother."
        },
        child_feeding_is_reduced: {
            refer: "Tertiary health care centre",
            message: "Emergency required admission and monitoring."
        },
        child_is_drowsy: {
            refer: "Tertiary health care centre",
            message: "It could be Pneumonia."
        },
        respiratory_rate_is_more_than__60_beats_per_minute: {
            refer: "Tertiary health care centre",
            message: "It could be Pneumonia."
        },
        chest_indrawing: {
            refer: "Tertiary health care centre",
            message: "It could be Pneumonia."
        },
        abdominal_distension: {
            refer: "Tertiary health care centre",
            message: "It could be just gas/constipation but it could be intestinal obstruction and could be fatal."
        },
        jaundice: {
            refer: "Tertiary health care centre",
            message: "Required further investigation."
        },
        child_not_passing_urine_and_stool: {
            refer: "Tertiary health care centre",
            message: "Could be some obstruction."
        },
        fever_more_than_normal: {
            refer: "Health centre/PHC/CHC",
            message: "Fever more than normal."
        },
        cough_or_cold: {
            refer: "Health centre/PHC/CHC",
            message: "Cough or cold."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none" && fieldname !== "none_mother") {
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
frappe.ui.form.on('Dyspepsia_Acidity', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_dyspepsia_acidity_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_blsh': '#FF5722',
                'check_ippo': '#4CAF50',
                'check_yibx': '#2196F3',
                'check_fuwq': '#E91E63',
                'check_qwyi': '#9C27B0',
                'check_qdyk': '#26A69A',
                'check_offh': '#FFC107',
                'check_owzn': '#00BCD4',
                'check_vkrm': '#8BC34A'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control dyspepsia_acidity field visibility
    any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness(frm) {
        show_red_flag(frm, 'any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    abdominal_pain_with_vomiting(frm) {
        show_red_flag(frm, 'abdominal_pain_with_vomiting');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    worsening_of_abdominal_pain(frm) {
        show_red_flag(frm, 'worsening_of_abdominal_pain');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    any_bloating_sensation(frm) {
        show_red_flag(frm, 'any_bloating_sensation');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    any_weight_loss(frm) {
        show_red_flag(frm, 'any_weight_loss');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    change_in_color_of_stools(frm) {
        show_red_flag(frm, 'change_in_color_of_stools');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    if_more_than50(frm) {
        show_red_flag(frm, 'if_more_than50');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },
    none_dyspepsia(frm) {
        show_red_flag(frm, 'none_dyspepsia');
        frm.trigger("toggle_dyspepsia_acidity_field");
    },

    // Dyspepsia acidity select → controls section visibility
    dyspepsia_acidity(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show dyspepsia_acidity field if any red flag condition is met
    toggle_dyspepsia_acidity_field(frm) {
        let show = (
            frm.doc.any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness ||
            frm.doc.abdominal_pain_with_vomiting ||
            frm.doc.worsening_of_abdominal_pain ||
            frm.doc.any_bloating_sensation ||
            frm.doc.any_weight_loss ||
            frm.doc.change_in_color_of_stools ||
            frm.doc.if_more_than50 ||
            frm.doc.none_dyspepsia
        );
        frm.toggle_display("dyspepsia_acidity", show);
        if (show) {
            frm.set_df_property("dyspepsia_acidity", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("dyspepsia_acidity", "options", ["Yes", "No"]);
        } else {
            frm.set_value("dyspepsia_acidity", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.dyspepsia_acidity === "Yes");
        frm.toggle_display("present_chief_complaints_section", show_sections);
        frm.toggle_display("section_break_gaxq", show_sections);
        frm.toggle_display("section_break_xjpc", show_sections);
        frm.toggle_display("associates_symptoms_section", show_sections);
        frm.toggle_display("past_history_section", show_sections);
        frm.toggle_display("personal_and_lifestyle_history_section", show_sections);
        frm.toggle_display("occupation_history_section", show_sections);
        frm.toggle_display("physical_examination_section", show_sections);
        frm.toggle_display("lab_test_section", show_sections);
        frm.toggle_display("check_blsh", show_sections);
        frm.toggle_display("check_ippo", show_sections);
        frm.toggle_display("check_yibx", show_sections);
        frm.toggle_display("check_fuwq", show_sections);
        frm.toggle_display("check_qwyi", show_sections);
        frm.toggle_display("check_qdyk", show_sections);
        frm.toggle_display("check_offh", show_sections);
        frm.toggle_display("check_owzn", show_sections);
        frm.toggle_display("check_vkrm", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("dyspepsia_acidity field value:", frm.doc.dyspepsia_acidity); // Debugging
        if (frm.doc.dyspepsia_acidity === "Yes") {
            console.log("check_blsh:", frm.doc.check_blsh); // Debugging
            console.log("check_ippo:", frm.doc.check_ippo); // Debugging
            console.log("check_yibx:", frm.doc.check_yibx); // Debugging
            console.log("check_fuwq:", frm.doc.check_fuwq); // Debugging
            console.log("check_qwyi:", frm.doc.check_qwyi); // Debugging
            console.log("check_qdyk:", frm.doc.check_qdyk); // Debugging
            console.log("check_offh:", frm.doc.check_offh); // Debugging
            console.log("check_owzn:", frm.doc.check_owzn); // Debugging
            console.log("check_vkrm:", frm.doc.check_vkrm); // Debugging
            if (!frm.doc.check_blsh) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_ippo) {
                frappe.throw("You didn’t complete Section 2");
            }
            if (!frm.doc.check_yibx) {
                frappe.throw("You didn’t complete Section 3");
            }
            if (!frm.doc.check_fuwq) {
                frappe.throw("You didn’t complete Associates Symptoms Section");
            }
            if (!frm.doc.check_qwyi) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_qdyk) {
                frappe.throw("You didn’t complete Personal and Lifestyle History Section");
            }
            if (!frm.doc.check_offh) {
                frappe.throw("You didn’t complete Occupation History Section");
            }
            if (!frm.doc.check_owzn) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
            if (!frm.doc.check_vkrm) {
                frappe.throw("You didn’t complete Laboratory Test Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_blsh': '#FF5722', // Deep Orange
        'check_ippo': '#4CAF50', // Green
        'check_yibx': '#2196F3', // Blue
        'check_fuwq': '#E91E63', // Pink
        'check_qwyi': '#9C27B0', // Purple
        'check_qdyk': '#26A69A', // Teal
        'check_offh': '#FFC107', // Amber
        'check_owzn': '#00BCD4', // Cyan
        'check_vkrm': '#8BC34A'  // Lime
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
        any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness: {
            refer: "Tertiary health care centre",
            message: "Could indicate a serious condition like pancreatitis or bowel obstruction."
        },
        abdominal_pain_with_vomiting: {
            refer: "Tertiary health care centre",
            message: "May suggest acute gastrointestinal issues requiring urgent evaluation."
        },
        worsening_of_abdominal_pain: {
            refer: "Tertiary health care centre",
            message: "Persistent or worsening pain may indicate a serious underlying condition."
        },
        any_bloating_sensation: {
            refer: "Health centre/PHC/CHC",
            message: "Could be related to gastrointestinal issues needing further evaluation."
        },
        any_weight_loss: {
            refer: "Tertiary health care centre",
            message: "Unexplained weight loss may indicate malignancy or chronic disease."
        },
        change_in_color_of_stools: {
            refer: "Tertiary health care centre",
            message: "May suggest gastrointestinal bleeding or liver issues."
        },
        if_more_than50: {
            refer: "Tertiary health care centre",
            message: "Increased risk of serious conditions in patients over 50."
        },
        none_dyspepsia: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_dyspepsia") {
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
frappe.ui.form.on('Foot and Ankle Pain', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_foot_and_ankle_pain_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_vtwa': '#FF5722',
                'check_jovb': '#4CAF50',
                'check_hstn': '#2196F3',
                'check_ndgt': '#E91E63',
                'check_yujn': '#9C27B0'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control foot_and_ankle_pain field visibility
    foot_ankle_pain_not_subsiding(frm) {
        show_red_flag(frm, 'foot_ankle_pain_not_subsiding');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    sever_swelling(frm) {
        show_red_flag(frm, 'sever_swelling');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    any_abnormal_gait(frm) {
        show_red_flag(frm, 'any_abnormal_gait');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    any_fever_or_unexplained_weight_loss(frm) {
        show_red_flag(frm, 'any_fever_or_unexplained_weight_loss');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    any_history_of_trauma_or_fall(frm) {
        show_red_flag(frm, 'any_history_of_trauma_or_fall');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    not_able_to_move_affected_part(frm) {
        show_red_flag(frm, 'not_able_to_move_affected_part');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    change_in_vital_signs_with_these_pains(frm) {
        show_red_flag(frm, 'change_in_vital_signs_with_these_pains');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },
    none_foot_ankle_pain(frm) {
        show_red_flag(frm, 'none_foot_ankle_pain');
        frm.trigger("toggle_foot_and_ankle_pain_field");
    },

    // Foot and ankle pain select → controls section visibility
    foot_and_ankle_pain(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show foot_and_ankle_pain field if any red flag condition is met
    toggle_foot_and_ankle_pain_field(frm) {
        let show = (
            frm.doc.foot_ankle_pain_not_subsiding ||
            frm.doc.sever_swelling ||
            frm.doc.any_abnormal_gait ||
            frm.doc.any_fever_or_unexplained_weight_loss ||
            frm.doc.any_history_of_trauma_or_fall ||
            frm.doc.not_able_to_move_affected_part ||
            frm.doc.change_in_vital_signs_with_these_pains ||
            frm.doc.none_foot_ankle_pain
        );
        frm.toggle_display("foot_and_ankle_pain", show);
        if (show) {
            frm.set_df_property("foot_and_ankle_pain", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("foot_and_ankle_pain", "options", ["Yes", "No"]);
        } else {
            frm.set_value("foot_and_ankle_pain", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.foot_and_ankle_pain === "Yes");
        frm.toggle_display("present_complaints_section", show_sections);
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_lmwp", show_sections);
        frm.toggle_display("section_break_evsg", show_sections);
        frm.toggle_display("section_break_njkg", show_sections);
        frm.toggle_display("check_vtwa", show_sections);
        frm.toggle_display("check_jovb", show_sections);
        frm.toggle_display("check_hstn", show_sections);
        frm.toggle_display("check_ndgt", show_sections);
        frm.toggle_display("check_yujn", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("foot_and_ankle_pain field value:", frm.doc.foot_and_ankle_pain); // Debugging
        if (frm.doc.foot_and_ankle_pain === "Yes") {
            console.log("check_vtwa:", frm.doc.check_vtwa); // Debugging
            console.log("check_jovb:", frm.doc.check_jovb); // Debugging
            console.log("check_hstn:", frm.doc.check_hstn); // Debugging
            console.log("check_ndgt:", frm.doc.check_ndgt); // Debugging
            console.log("check_yujn:", frm.doc.check_yujn); // Debugging
            if (!frm.doc.check_vtwa) {
                frappe.throw("You didn’t complete Present Complaints Section");
            }
            if (!frm.doc.check_jovb) {
                frappe.throw("You didn’t complete Section 2");
            }
            if (!frm.doc.check_hstn) {
                frappe.throw("You didn’t complete Associated Complaints Section");
            }
            if (!frm.doc.check_ndgt) {
                frappe.throw("You didn’t complete Past and Occupation HistorySection");
            }
            if (!frm.doc.check_yujn) {
                frappe.throw("You didn’t complete Family History and Laboratory Test Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_vtwa': '#FF5722', // Deep Orange
        'check_jovb': '#4CAF50', // Green
        'check_hstn': '#2196F3', // Blue
        'check_ndgt': '#E91E63', // Pink
        'check_yujn': '#9C27B0'  // Purple
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
        foot_ankle_pain_not_subsiding: {
            refer: "Health centre/PHC/CHC",
            message: "Foot and ankle pain not subsiding with pain killer or basic exercises for more than 5 days."
        },
        sever_swelling: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        any_abnormal_gait: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        any_fever_or_unexplained_weight_loss: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        any_history_of_trauma_or_fall: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        not_able_to_move_affected_part: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        change_in_vital_signs_with_these_pains: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation needs further investigations."
        },
        none_foot_ankle_pain: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_foot_ankle_pain") {
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
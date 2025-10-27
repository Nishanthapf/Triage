frappe.ui.form.on('Jaundice', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_jaundices_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_iepj': '#FF5722',
                'check_uheh': '#4CAF50',
                'check_rcsw': '#2196F3',
                'check_ylws': '#E91E63',
                'check_rvmy': '#9C27B0',
                'check_wkjy': '#26A69A'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control jaundices field visibility
    any_jaundice_refer_for_lab_test(frm) {
        show_red_flag(frm, 'any_jaundice_refer_for_lab_test');
        frm.trigger("toggle_jaundices_field");
    },
    severe_abdominal_pain_or_tenderness(frm) {
        show_red_flag(frm, 'severe_abdominal_pain_or_tenderness');
        frm.trigger("toggle_jaundices_field");
    },
    patient_is_confusedagitated_or_drowsy(frm) {
        show_red_flag(frm, 'patient_is_confusedagitated_or_drowsy');
        frm.trigger("toggle_jaundices_field");
    },
    high_fever(frm) {
        show_red_flag(frm, 'high_fever');
        frm.trigger("toggle_jaundices_field");
    },
    vomiting_blood(frm) {
        show_red_flag(frm, 'vomiting_blood');
        frm.trigger("toggle_jaundices_field");
    },
    blood_in_stool_or_black_stoolnot_passing_urine(frm) {
        show_red_flag(frm, 'blood_in_stool_or_black_stoolnot_passing_urine');
        frm.trigger("toggle_jaundices_field");
    },
    any_painful_lymphnode(frm) {
        show_red_flag(frm, 'any_painful_lymphnode');
        frm.trigger("toggle_jaundices_field");
    },
     none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_jaundices_field");
    },
    jaundice(frm) {
        show_red_flag(frm, 'jaundice');
        frm.trigger("toggle_jaundices_field");
    },
    abdominal(frm) {
        show_red_flag(frm, 'abdominal');
        frm.trigger("toggle_jaundices_field");
    },
    child_is_confusedagitated_or_drowsy(frm) {
        show_red_flag(frm, 'child_is_confusedagitated_or_drowsy');
        frm.trigger("toggle_jaundices_field");
    },
    fever_jaundice(frm) {
        show_red_flag(frm, 'fever_jaundice');
        frm.trigger("toggle_jaundices_field");
    },
    excessive_vomiting(frm) {
        show_red_flag(frm, 'excessive_vomiting');
        frm.trigger("toggle_jaundices_field");
    },
    not_passing_urine(frm) {
        show_red_flag(frm, 'not_passing_urine');
        frm.trigger("toggle_jaundices_field");
    },
    none_jaundice(frm) {
        show_red_flag(frm, 'none_jaundice');
        frm.trigger("toggle_jaundices_field");
    },

    // Jaundice select → controls section visibility
    jaundices(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show jaundices field if any red flag condition is met
    toggle_jaundices_field(frm) {
        let show = (
            frm.doc.any_jaundice_refer_for_lab_test ||
            frm.doc.severe_abdominal_pain_or_tenderness ||
            frm.doc.patient_is_confusedagitated_or_drowsy ||
            frm.doc.high_fever ||
            frm.doc.vomiting_blood ||
            frm.doc.blood_in_stool_or_black_stoolnot_passing_urine ||
            frm.doc.any_painful_lymphnode ||
            frm.doc.none ||
            frm.doc.jaundice ||
            frm.doc.abdominal ||
            frm.doc.child_is_confusedagitated_or_drowsy ||
            frm.doc.fever_jaundice ||
            frm.doc.excessive_vomiting ||
            frm.doc.not_passing_urine ||
            frm.doc.none_jaundice
        );
        frm.toggle_display("jaundices", show);
        if (show) {
            frm.set_df_property("jaundices", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("jaundices", "options", ["Yes", "No"]);
        } else {
            frm.set_value("jaundices", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.jaundices === "Yes");
        frm.toggle_display("present_chief_complaints_section", show_sections);
        frm.toggle_display("associated_symptoms_section", show_sections);
        frm.toggle_display("past_history_section", show_sections);
        frm.toggle_display("personal_history_section", show_sections);
        frm.toggle_display("family_history_section", show_sections);
        frm.toggle_display("physical_examination_section", show_sections);
        frm.toggle_display("lab_test_section", show_sections);
        frm.toggle_display("check_iepj", show_sections);
        frm.toggle_display("check_uheh", show_sections);
        frm.toggle_display("check_rcsw", show_sections);
        frm.toggle_display("check_ylws", show_sections);
        frm.toggle_display("check_rvmy", show_sections);
        frm.toggle_display("check_wkjy", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("jaundices field value:", frm.doc.jaundices); // Debugging
        if (frm.doc.jaundices === "Yes") {
            console.log("check_iepj:", frm.doc.check_iepj); // Debugging
            console.log("check_uheh:", frm.doc.check_uheh); // Debugging
            console.log("check_rcsw:", frm.doc.check_rcsw); // Debugging
            console.log("check_ylws:", frm.doc.check_ylws); // Debugging
            console.log("check_rvmy:", frm.doc.check_rvmy); // Debugging
            console.log("check_wkjy:", frm.doc.check_wkjy); // Debugging
            if (!frm.doc.check_iepj) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_uheh) {
                frappe.throw("You didn’t complete Associated Symptoms Section");
            }
            if (!frm.doc.check_rcsw) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_ylws) {
                frappe.throw("You didn’t complete Personal History Section");
            }
            if (!frm.doc.check_rvmy) {
                frappe.throw("You didn’t complete Family History Section");
            }
            if (!frm.doc.check_wkjy) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_iepj': '#FF5722', // Deep Orange
        'check_uheh': '#4CAF50', // Green
        'check_rcsw': '#2196F3', // Blue
        'check_ylws': '#E91E63', // Pink
        'check_rvmy': '#9C27B0', // Purple
        'check_wkjy': '#26A69A'  // Teal
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
        any_jaundice_refer_for_lab_test: {
            refer: "Health centre/PHC/CHC",
            message: "Any Jaundice requires lab test evaluation."
        },
        severe_abdominal_pain_or_tenderness: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy and could be also secondary to alcohol overdose, GI bleed, terminal malignancy and hepatitis C or E infection, pre-existing liver diseases."
        },
        patient_is_confusedagitated_or_drowsy: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy and could be also secondary to alcohol overdose, GI bleed, terminal malignancy and hepatitis C or E infection, pre-existing liver diseases."
        },
        high_fever: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy and could be also secondary to alcohol overdose, GI bleed, terminal malignancy and hepatitis C or E infection, pre-existing liver diseases."
        },
        vomiting_blood: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy and could be also secondary to alcohol overdose, GI bleed, terminal malignancy and hepatitis C or E infection, pre-existing liver diseases."
        },
        blood_in_stool_or_black_stoolnot_passing_urine: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy and could be also secondary to alcohol overdose, GI bleed, terminal malignancy and hepatitis C or E infection, pre-existing liver diseases."
        },
        any_painful_lymphnode: {
            refer: "Health centre/PHC/CHC",
            message: "Could be due to local infections."
        },
        jaundice: {
            refer: "Health centre/PHC/CHC",
            message: "Any Jaundice requires lab test evaluation."
        },
        abdominal: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy due to pre-existing liver diseases and also severe dehydration."
        },
        child_is_confusedagitated_or_drowsy: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy due to pre-existing liver diseases and also severe dehydration."
        },
        fever_jaundice: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy due to pre-existing liver diseases and also severe dehydration."
        },
        excessive_vomiting: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy due to pre-existing liver diseases and also severe dehydration."
        },
        not_passing_urine: {
            refer: "Tertiary health care centre",
            message: "Could be hepatic encephalopathy due to pre-existing liver diseases and also severe dehydration."
        },
        none_jaundice: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_jaundice") {
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
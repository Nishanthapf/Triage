frappe.ui.form.on('Pregnancy Care', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.trigger("toggle_pregnancy_care_field");
        frm.trigger("toggle_sections");
    },

    // which_pregnancy change → trigger section toggles
    which_pregnancy(frm) {
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → trigger red flags and control pregnancy_care field visibility
    any_urinary_complaints(frm) {
        show_red_flag(frm, 'any_urinary_complaints');
        frm.trigger("toggle_pregnancy_care_field");
    },
    if_hb_less_than_7_gmdl(frm) {
        show_red_flag(frm, 'if_hb_less_than_7_gmdl');
        frm.trigger("toggle_pregnancy_care_field");
    },
    server_headche(frm) {
        show_red_flag(frm, 'server_headche');
        frm.trigger("toggle_pregnancy_care_field");
    },
    reduces_or_absent_foetal_movement(frm) {
        show_red_flag(frm, 'reduces_or_absent_foetal_movement');
        frm.trigger("toggle_pregnancy_care_field");
    },
    leaking_or_bleeding_pv(frm) {
        show_red_flag(frm, 'leaking_or_bleeding_pv');
        frm.trigger("toggle_pregnancy_care_field");
    },
    none_pregnancy(frm) {
        show_red_flag(frm, 'none_pregnancy');
        frm.trigger("toggle_pregnancy_care_field");
    },

    // BP fields → trigger red flag check
    bp_systolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_pregnancy_care_field");
    },
    bp_diastolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_pregnancy_care_field");
    },

    // Pregnancy care select → controls section visibility
    pregnancy_care(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show pregnancy_care field if any red flag condition is met
    toggle_pregnancy_care_field(frm) {
        let show = (
            frm.doc.any_urinary_complaints ||
            frm.doc.if_hb_less_than_7_gmdl ||
            frm.doc.server_headche ||
            frm.doc.reduces_or_absent_foetal_movement ||
            frm.doc.leaking_or_bleeding_pv ||
            frm.doc.none_pregnancy ||
            (frm.doc.bp_systolic > 130 || frm.doc.bp_diastolic > 80)
        );

        // Show/hide the pregnancy_care field
        frm.toggle_display("pregnancy_care", show);

        // Set label and options dynamically
        if (show) {
            frm.set_df_property("pregnancy_care", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("pregnancy_care", "options", ["Yes", "No"]);
        } else {
            frm.set_value("pregnancy_care", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected in pregnancy_care
    toggle_sections(frm) {
        let show_sections = (frm.doc.pregnancy_care === "Yes");
        let show_prev_preg = show_sections && (frm.doc.which_pregnancy >= 2);

        // Toggle visibility of section breaks
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("history_of_previous_pregnancy_section", show_prev_preg);
        frm.toggle_display("section_break_kvpg", show_sections);

        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_tded", show_sections);
        frm.toggle_display("check_wbmb", show_prev_preg);
        frm.toggle_display("check_cquo", show_sections);
    },

    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.pregnancy_care === "Yes") {
            if (!frm.doc.check_tded) {
                frappe.throw("You didn’t complete Present History Section");
            }
            if (frm.doc.which_pregnancy >= 2 && !frm.doc.check_wbmb) {
                frappe.throw("You didn’t complete History of Previous Pregnancy Section");
            }
            if (!frm.doc.check_cquo) {
                frappe.throw("You didn’t complete Past History and Physical Examination Section");
            }
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        bp: {
            refer: (frm.doc.bp_systolic > 150 || frm.doc.bp_diastolic > 90) ? 
                "Tertiary health care centre" : 
                "Health centre/PHC/CHC",
            message: (frm.doc.bp_systolic > 150 || frm.doc.bp_diastolic > 90) ? 
                "Need to start antihypertensives and monitor." : 
                "We can monitor at health centre, check foetal heart if BP increasing, refer."
        },
        any_urinary_complaints: {
            refer: "Health centre/PHC/CHC",
            message: "Investigation and treat."
        },
        if_hb_less_than_7_gmdl: {
            refer: "Tertiary health care centre",
            message: "Required blood transfusion."
        },
        server_headche: {
            refer: "Tertiary health care centre",
            message: "Could be PIH."
        },
        reduces_or_absent_foetal_movement: {
            refer: "Tertiary health care centre",
            message: "Required further monitoring or can lose baby."
        },
        leaking_or_bleeding_pv: {
            refer: "Tertiary health care centre",
            message: "Required further monitoring or can lose baby."
        },
        none_pregnancy: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = false;
    if (fieldname === "bp" && (frm.doc.bp_systolic > 130 || frm.doc.bp_diastolic > 80)) {
        condition_met = true;
    } else if (frm.doc[fieldname]) {
        condition_met = true;
    }

    if (condition_met && fieldname !== "none_pregnancy") {
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
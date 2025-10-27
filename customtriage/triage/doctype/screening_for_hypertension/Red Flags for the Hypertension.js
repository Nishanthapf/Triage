frappe.ui.form.on('Screening for Hypertension', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.trigger("toggle_screening_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → trigger red flags and control screening_for_hypertension visibility
    new_hypertensive(frm) {
        show_red_flag(frm, 'new_hypertensive');
        frm.trigger("toggle_screening_field");
    },
    sudden_swelling_of_legs(frm) {
        show_red_flag(frm, 'sudden_swelling_of_legs');
        frm.trigger("toggle_screening_field");
    },
    any_history_of_fainting_or_fall(frm) {
        show_red_flag(frm, 'any_history_of_fainting_or_fall');
        frm.trigger("toggle_screening_field");
    },
    severe_headache_sudden_onset(frm) {
        show_red_flag(frm, 'severe_headache_sudden_onset');
        frm.trigger("toggle_screening_field");
    },
    chest_pain_sudden_onset(frm) {
        show_red_flag(frm, 'chest_pain_sudden_onset');
        frm.trigger("toggle_screening_field");
    },
    breathlessness_sudden_onset(frm) {
        show_red_flag(frm, 'breathlessness_sudden_onset');
        frm.trigger("toggle_screening_field");
    },
    any_nausea_vomiting_sudden_onset(frm) {
        show_red_flag(frm, 'any_nausea_vomiting_sudden_onset');
        frm.trigger("toggle_screening_field");
    },
    drowsy(frm) {
        show_red_flag(frm, 'drowsy');
        frm.trigger("toggle_screening_field");
    },
    any_slurrred_speech(frm) {
        show_red_flag(frm, 'any_slurrred_speech');
        frm.trigger("toggle_screening_field");
    },
    any_change_in_gaitimbalance(frm) {
        show_red_flag(frm, 'any_change_in_gaitimbalance');
        frm.trigger("toggle_screening_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_screening_field");
    },

    // BP fields → trigger red flag check
    bp_systolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_screening_field");
    },
    bp_diastolic(frm) {
        show_red_flag(frm, 'bp');
        frm.trigger("toggle_screening_field");
    },

    // Screening select → controls section visibility
    screening_for_hypertension(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show screening_for_hypertension if any red flag condition is met
    toggle_screening_field(frm) {
        let show = (
            frm.doc.new_hypertensive ||
            frm.doc.sudden_swelling_of_legs ||
            frm.doc.any_history_of_fainting_or_fall ||
            frm.doc.severe_headache_sudden_onset ||
            frm.doc.chest_pain_sudden_onset ||
            frm.doc.breathlessness_sudden_onset ||
            frm.doc.any_nausea_vomiting_sudden_onset ||
            frm.doc.drowsy ||
            frm.doc.any_slurrred_speech ||
            frm.doc.any_change_in_gaitimbalance ||
            frm.doc.none ||
            (frm.doc.bp_systolic > 140 || frm.doc.bp_diastolic > 90)
        );

        // Show/hide the screening_for_hypertension field
        frm.toggle_display("screening_for_hypertension", show);

        // Set label and options dynamically
        if (show) {
            frm.set_df_property("screening_for_hypertension", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("screening_for_hypertension", "options", ["Yes", "No"]);
        } else {
            frm.set_value("screening_for_hypertension", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected in screening_for_hypertension
    toggle_sections(frm) {
        let show_sections = (frm.doc.screening_for_hypertension === "Yes");

        // Toggle visibility of section breaks
        frm.toggle_display("section_break_bshx", show_sections);
        frm.toggle_display("section_break_artb", show_sections);
        frm.toggle_display("section_break_mele", show_sections);
        frm.toggle_display("section_break_liie", show_sections);
        frm.toggle_display("section_break_casv", show_sections);


        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_dtvk", show_sections);
        frm.toggle_display("check_ytyo", show_sections);
        // frm.toggle_display("check_lgdm", show_sections);
        frm.toggle_display("check_bmgb", show_sections);
    },

    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.screening_for_hypertension === "Yes") {
            if (!frm.doc.check_dtvk) {
                frappe.throw("You didn’t complete Section Present Complaints");
            }
            if (!frm.doc.check_ytyo) {
                frappe.throw("You didn’t complete Section Personal History");
            }
            // if (!frm.doc.check_lgdm) {
            //     frappe.throw("You didn’t complete Section Medical History");
            // }
            if (!frm.doc.check_bmgb) {
                frappe.throw("You didn’t complete Laboratory Test Section");
            }
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        bp: {
            refer: "Health center / PHC / CHC",
            message: "Blood pressure greater than 140/90 requires evaluation."
        },
        new_hypertensive: {
            refer: "Health center / PHC / CHC",
            message: "New hypertensive patient needs evaluation and monitoring."
        },
        sudden_swelling_of_legs: {
            refer: "Health center / PHC / CHC",
            message: "Could be kidney damage or heart failure."
        },
        any_history_of_fainting_or_fall: {
            refer: "Health center / PHC / CHC",
            message: "Either BP is uncontrolled or very low, it could be head injury."
        },
        severe_headache_sudden_onset: {
            refer: "Tertiary health centre",
            message: "Could be very high BP or bleed into the brain."
        },
        chest_pain_sudden_onset: {
            refer: "Tertiary health centre",
            message: "MI (Myocardial Infarction)."
        },
        breathlessness_sudden_onset: {
            refer: "Tertiary health centre",
            message: "MI or kidney damage."
        },
        any_nausea_vomiting_sudden_onset: {
            refer: "Tertiary health centre",
            message: "Warning for a stroke or bleed into the brain."
        },
        drowsy: {
            refer: "Tertiary health centre",
            message: "Could be stroke/bleed/hypotension/MI."
        },
        any_slurrred_speech: {
            refer: "Tertiary health centre",
            message: "Could be warning of stroke."
        },
        any_change_in_gaitimbalance: {
            refer: "Tertiary health centre",
            message: "Could be warning of stroke."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = false;
    if (fieldname === "bp" && (frm.doc.bp_systolic > 140 || frm.doc.bp_diastolic > 90)) {
        condition_met = true;
    } else if (frm.doc[fieldname]) {
        condition_met = true;
    }

    if (condition_met && fieldname !== "none") {
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
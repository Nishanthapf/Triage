frappe.ui.form.on('Hypertension Follow up', {
    refresh(frm) {
        console.log("Script loaded");
        frm.toggle_display("section_break_rncs", true); // Always show this section
        frm.trigger("toggle_hypertension_field");
        frm.trigger("toggle_sections");
    },

    // ✅ Each field passes its name explicitly to toggle_event
    new_hypertensive(frm) { toggle_event(frm, 'new_hypertensive'); },
    sudden_swelling_of_legs(frm) { toggle_event(frm, 'sudden_swelling_of_legs'); },
    any_history_of_fainting_or_fall(frm) { toggle_event(frm, 'any_history_of_fainting_or_fall'); },
    severe_headache_sudden_onset(frm) { toggle_event(frm, 'severe_headache_sudden_onset'); },
    chest_pain_sudden_onset(frm) { toggle_event(frm, 'chest_pain_sudden_onset'); },
    breathlessness_sudden_onset(frm) { toggle_event(frm, 'breathlessness_sudden_onset'); },
    any_nausea_vomiting_sudden_onset(frm) { toggle_event(frm, 'any_nausea_vomiting_sudden_onset'); },
    drowsy(frm) { toggle_event(frm, 'drowsy'); },
    any_slurrred_speech(frm) { toggle_event(frm, 'any_slurrred_speech'); },
    any_change_in_gaitimbalance(frm) { toggle_event(frm, 'any_change_in_gaitimbalance'); },
    none(frm) { toggle_event(frm, 'none'); },
    bp_systolic(frm) { toggle_event(frm, 'bp'); },
    bp_diastolic(frm) { toggle_event(frm, 'bp'); },

    hypertension_follow_up(frm) {
        frm.trigger("toggle_sections");
    },

    toggle_hypertension_field(frm) {
        // ✅ Logic: show field if any red flag or 'none' is selected
        let has_red_flag =
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
            (frm.doc.bp_systolic > 140 || frm.doc.bp_diastolic > 90);

        // ✅ Show if any red flag OR 'none' is checked
        let show = has_red_flag || frm.doc.none;

        frm.toggle_display("hypertension_follow_up", show);

        if (show) {
            frm.set_df_property("hypertension_follow_up", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("hypertension_follow_up", "options", ["Yes", "No"]);
            frm.set_df_property("hypertension_follow_up", "reqd", true);
            frm.refresh_field("hypertension_follow_up");
        } else {
            frm.set_value("hypertension_follow_up", "");
            frm.set_df_property("hypertension_follow_up", "reqd", false);
        }
    },

    toggle_sections(frm) {
        let show_sections = (frm.doc.hypertension_follow_up === "Yes");
        frm.toggle_display("section_break_vooc", show_sections);
        frm.toggle_display("personal_and_lifestyle_history_section", show_sections);
        frm.toggle_display("laboratory_test_section", show_sections);
        frm.toggle_display("section_break_bpam", show_sections);
        frm.toggle_display("section_break_bfxw", show_sections);
        frm.toggle_display("check_kpry", show_sections);
        frm.toggle_display("check_dgyi", show_sections);
        frm.toggle_display("check_xdfn", show_sections);
    },

    validate(frm) {
        if (frm.doc.hypertension_follow_up === "Yes") {
            if (!frm.doc.check_kpry) {
                frappe.throw("You didn’t complete Section Present Complaints");
            }
            if (!frm.doc.check_dgyi) {
                frappe.throw("You didn’t complete Section Personal and Lifestyle History");
            }
            if (!frm.doc.check_xdfn) {
                frappe.throw("You didn’t complete Laboratory Test Section");
            }
        }
    }
});

// ✅ Helper function for checkbox triggers
function toggle_event(frm, fieldname) {
    show_red_flag(frm, fieldname);
    frm.trigger("toggle_hypertension_field");
}

// ✅ Red flag popup handler (fixed)
function show_red_flag(frm, fieldname) {
    const red_flags = {
        bp: {
            refer: "Health center / PHC / CHC",
            message: "Recheck the BP after 15 min, if still persistent, refer the case."
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
            message: "Either BP is uncontrolled or very low, could be head injury."
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
        }
    };

    let condition_met = false;

    if (fieldname === "bp" && (frm.doc.bp_systolic > 140 || frm.doc.bp_diastolic > 90)) {
        condition_met = true;
    } else if (frm.doc[fieldname] && fieldname !== "none") {
        condition_met = true;
    }

    if (condition_met && fieldname !== "none") {
        const info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: "Red Flag Warning 🚨",
                message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
                indicator: "red"
            });
        }
    }
}

frappe.ui.form.on('Abdominal pain Gastrointestinal', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Always show red_flags_section
        frm.trigger("toggle_abdominal_pain_field");
        frm.trigger("toggle_sections");
    },
    // Symptom checkboxes → trigger red flags and control abdominal_pain_gastrointestinal visibility
    sudden_abdominalpain_vomiting(frm) {
        show_red_flag(frm, 'sudden_abdominalpain_vomiting');
        frm.trigger("toggle_abdominal_pain_field");
    },
    abdominal_pain_with_vomiting(frm) {
        show_red_flag(frm, 'abdominal_pain_with_vomiting');
        frm.trigger("toggle_abdominal_pain_field");
    },
    worsening_of_abdominal_pain(frm) {
        show_red_flag(frm, 'worsening_of_abdominal_pain');
        frm.trigger("toggle_abdominal_pain_field");
    },
    any_bloating_sensation(frm) {
        show_red_flag(frm, 'any_bloating_sensation');
        frm.trigger("toggle_abdominal_pain_field");
    },
    any_weight_loss(frm) {
        show_red_flag(frm, 'any_weight_loss');
        frm.trigger("toggle_abdominal_pain_field");
    },
    change_in_color_of_stools(frm) {
        show_red_flag(frm, 'change_in_color_of_stools');
        frm.trigger("toggle_abdominal_pain_field");
    },
    history_of_abdominai(frm) {
        show_red_flag(frm, 'history_of_abdominai');
        frm.trigger("toggle_abdominal_pain_field");
    },
    drowsy(frm) {
        show_red_flag(frm, 'sudden_abdominalpain_vomiting'); // Check for combined condition
        frm.trigger("toggle_abdominal_pain_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_abdominal_pain_field");
    },
    // Age field → trigger red flag check for history_of_abdominai
    age(frm) {
        show_red_flag(frm, 'history_of_abdominai');
        frm.trigger("toggle_abdominal_pain_field");
    },
    // Screening select → controls section visibility
    abdominal_pain_gastrointestinal(frm) {
        frm.trigger("toggle_sections");
    },
    // Helper: Show abdominal_pain_gastrointestinal if any red flag condition is met
    toggle_abdominal_pain_field(frm) {
        let show = (
            (frm.doc.sudden_abdominalpain_vomiting && frm.doc.drowsy) ||
            frm.doc.abdominal_pain_with_vomiting ||
            frm.doc.sudden_abdominalpain_vomiting ||
            frm.doc.worsening_of_abdominal_pain ||
            frm.doc.any_bloating_sensation ||
            frm.doc.any_weight_loss ||
            frm.doc.change_in_color_of_stools ||
            (frm.doc.history_of_abdominai && frm.doc.age > 50) ||
            frm.doc.none
        );
        // Show/hide the abdominal_pain_gastrointestinal field
        frm.toggle_display("abdominal_pain_gastrointestinal", show);
        // Set label and options dynamically
        if (show) {
            frm.set_df_property("abdominal_pain_gastrointestinal", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("abdominal_pain_gastrointestinal", "options", ["Yes", "No"]);
        } else {
            frm.set_value("abdominal_pain_gastrointestinal", "");
        }
    },
    // Helper: Show/hide form sections and fields based on abdominal_pain_gastrointestinal
    toggle_sections(frm) {
        let show_sections = (frm.doc.abdominal_pain_gastrointestinal === "Yes");
        // Toggle visibility of section breaks (except red_flags_section, which is always visible)
        frm.toggle_display("section_break_zfnt", show_sections);
        frm.toggle_display("section_break_mwnp", show_sections);
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_wxhv", show_sections);
        frm.toggle_display("section_break_rrpy", show_sections);
        frm.toggle_display("section_break_ufab", show_sections);
        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_dmle", show_sections);
        frm.toggle_display("check_ugdt", show_sections);
        frm.toggle_display("check_sksj", show_sections);
        frm.toggle_display("check_slhq", show_sections);
        // frm.toggle_display("check_lkxh", show_sections);
        frm.toggle_display("check_gtte", show_sections);
    },
    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.abdominal_pain_gastrointestinal === "Yes") {
            if (!frm.doc.check_dmle) {
                frappe.throw("You didn’t complete Section Present Complaints");
            }
            if (!frm.doc.check_ugdt) {
                frappe.throw("You didn’t complete Section 2");
            }
            if (!frm.doc.check_sksj) {
                frappe.throw("You didn’t complete Section Associated complaints");
            }
            if (!frm.doc.check_slhq) {
                frappe.throw("You didn’t complete Section Personal and Lifestyle History");
            }
            // if (!frm.doc.check_lkxh) {
            //     frappe.throw("You didn’t complete Section LKXH");
            // }
            if (!frm.doc.check_gtte) {
                frappe.throw("You didn’t complete Section Family History and Laboratory Test");
            }
        }
    }
});
// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        sudden_abdominalpain_vomiting: {
            refer: frm.doc.drowsy ? "Tertiary health care centre" : "Health centre/PHC/CHC",
            message: frm.doc.drowsy ? "Could be acute abdomen- like appendicitis, ulcer perforation, ectopic SR." : "Sudden abdominal pain with vomiting requires evaluation."
        },
        abdominal_pain_with_vomiting: {
            refer: "Health centre/PHC/CHC",
            message: "Vomiting can lead to dehydration so needs IV."
        },
        worsening_of_abdominal_pain: {
            refer: "Health centre/PHC/CHC",
            message: "Required further investigations."
        },
        any_bloating_sensation: {
            refer: "Health centre/PHC/CHC",
            message: "Required further investigations / can also be gallstones."
        },
        any_weight_loss: {
            refer: "Health centre/PHC/CHC",
            message: "Could be malignancy."
        },
        change_in_color_of_stools: {
            refer: "Health centre/PHC/CHC",
            message: "Could be malignancy."
        },
        history_of_abdominai: {
            refer: frm.doc.age > 50 ? "Health centre/PHC/CHC" : "Health centre/PHC/CHC",
            message: frm.doc.age > 50 ? "Could be malignancy." : "First time abdominal pain requires evaluation."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };
    let condition_met = false;
    if (fieldname === "sudden_abdominalpain_vomiting" && frm.doc.sudden_abdominalpain_vomiting) {
        condition_met = true; // Trigger even without drowsy for basic evaluation
    } else if (fieldname === "history_of_abdominai" && frm.doc.history_of_abdominai && frm.doc.age > 50) {
        condition_met = true;
    } else if (frm.doc[fieldname] && fieldname !== "sudden_abdominalpain_vomiting" && fieldname !== "history_of_abdominai") {
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
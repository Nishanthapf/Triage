frappe.ui.form.on('Screening for Diabetes', {
    refresh(frm) {
        frm.trigger("toggle_screening_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → control screening_for_diabetes_form visibility
    loose_stools_with_dehydration(frm) { frm.trigger("toggle_screening_field"); },
    severe_vomiting(frm) { frm.trigger("toggle_screening_field"); },
    any_foul_smelling_ulcer(frm) { frm.trigger("toggle_screening_field"); },
    tooth_infection(frm) { frm.trigger("toggle_screening_field"); },
    swelling_of_legs(frm) { frm.trigger("toggle_screening_field"); },
    fever_with_dysuria(frm) { frm.trigger("toggle_screening_field"); },
    high_fever(frm) { frm.trigger("toggle_screening_field"); },
    check_hmpy(frm) { frm.trigger("toggle_screening_field"); },
    none(frm) { frm.trigger("toggle_screening_field"); },

    // Screening select → controls section visibility
    screening_for_diabetes_form(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show screening select if any symptom selected
    toggle_screening_field(frm) {
        let show = (
            frm.doc.loose_stools_with_dehydration ||
            frm.doc.severe_vomiting ||
            frm.doc.any_foul_smelling_ulcer ||
            frm.doc.tooth_infection ||
            frm.doc.swelling_of_legs ||
            frm.doc.fever_with_dysuria ||
            frm.doc.high_fever ||
            frm.doc.check_hmpy ||
            frm.doc.none
        );

        // show/hide field
        frm.toggle_display("screening_for_diabetes_form", show);

        // set label & options dynamically
        if (show) {
            frm.set_df_property("screening_for_diabetes_form", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("screening_for_diabetes_form", "options", ["Yes", "No"]);
        } else {
            frm.set_value("screening_for_diabetes_form", "");
        }
    },

    // Helper: Show sections only if "Yes" selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.screening_for_diabetes_form === "Yes");

        frm.toggle_display("section_break_mydq", show_sections);
        frm.toggle_display("section_break_yjlm", show_sections);
        frm.toggle_display("section_break_olkc", show_sections);
        frm.toggle_display("section_break_gtme", show_sections);
        frm.toggle_display("section_break_knrh", show_sections);

        // also show section completion checkboxes
        frm.toggle_display("section_mydq_completed", show_sections);
        frm.toggle_display("section_yjlm_completed", show_sections);
        frm.toggle_display("check_wtkw_completed", show_sections);
        frm.toggle_display("section_gtme_completed", show_sections);
        frm.toggle_display("lab_test_completed", show_sections);
    },

    // Validation before save → Ensure each section is marked completed if "Yes"
    validate(frm) {
        if (frm.doc.screening_for_diabetes_form === "Yes") {
            if (!frm.doc.section_mydq_completed) {
                frappe.throw("⚠️ You didn’t complete Section Present Chief Complaints");
            }
            if (!frm.doc.section_yjlm_completed) {
                frappe.throw("⚠️ You didn’t complete Section Associated Complaints.");
            }
            if (!frm.doc.check_wtkw_completed) {
                frappe.throw("⚠️ You didn’t complete Section Past History (Women).");
            }
            if (!frm.doc.section_gtme_completed) {
                frappe.throw("⚠️ You didn’t complete Section Personal and Physical Examination.");
            }
            if (!frm.doc.lab_test_completed) {
                frappe.throw("⚠️ You didn’t complete Lab Test Section.");
            }
        }
    }
});

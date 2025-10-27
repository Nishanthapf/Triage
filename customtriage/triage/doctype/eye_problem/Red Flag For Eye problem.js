frappe.ui.form.on('Eye problem', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.trigger("toggle_select_kpbe_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → trigger red flags and control select_kpbe field visibility
    sudden_loss_of_partial_or_complete_vision(frm) {
        show_red_flag(frm, 'sudden_loss_of_partial_or_complete_vision');
        frm.trigger("toggle_select_kpbe_field");
    },
    any_history_of_trauma(frm) {
        show_red_flag(frm, 'any_history_of_trauma');
        frm.trigger("toggle_select_kpbe_field");
    },
    any_history_of_foreign_body(frm) {
        show_red_flag(frm, 'any_history_of_foreign_body');
        frm.trigger("toggle_select_kpbe_field");
    },
    none_eyeproblem(frm) {
        show_red_flag(frm, 'none_eyeproblem');
        frm.trigger("toggle_select_kpbe_field");
    },

    // Select field → controls section visibility
    select_kpbe(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show select_kpbe field if any red flag condition is met
    toggle_select_kpbe_field(frm) {
        let show = (
            frm.doc.sudden_loss_of_partial_or_complete_vision ||
            frm.doc.any_history_of_trauma ||
            frm.doc.any_history_of_foreign_body ||
            frm.doc.none_eyeproblem
        );

        // Show/hide the select_kpbe field
        frm.toggle_display("select_kpbe", show);

        // Set label and options dynamically
        if (show) {
            frm.set_df_property("select_kpbe", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("select_kpbe", "options", ["Yes", "No"]);
        } else {
            frm.set_value("select_kpbe", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected in select_kpbe
    toggle_sections(frm) {
        let show_sections = (frm.doc.select_kpbe === "Yes");

        // Toggle visibility of section breaks
        frm.toggle_display("present_chief_complaints_section", show_sections);
        frm.toggle_display("associated_symptoms_section", show_sections);
        frm.toggle_display("past_history_section", show_sections);
        frm.toggle_display("occupation_history_section", show_sections);
        frm.toggle_display("section_break_etpj", show_sections);

        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_xdnq", show_sections);
        frm.toggle_display("check_azju", show_sections);
        frm.toggle_display("check_eqhu", show_sections);
        frm.toggle_display("check_emcp", show_sections);
        frm.toggle_display("check_rskd", show_sections);
    },

    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.select_kpbe === "Yes") {
            if (!frm.doc.check_xdnq) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_azju) {
                frappe.throw("You didn’t complete Associated Symptoms Section");
            }
            if (!frm.doc.check_eqhu) {
                frappe.throw("You didn’t complete Past History Section");
            }
            if (!frm.doc.check_emcp) {
                frappe.throw("You didn’t complete Occupation History Section");
            }
            if (!frm.doc.check_rskd) {
                frappe.throw("You didn’t complete Laboratory Test Section");
            }
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        sudden_loss_of_partial_or_complete_vision: {
            refer: "Tertiary health care centre",
            message: "It could be glaucoma (increased eye pressure can lead to loss of vision)."
        },
        any_history_of_trauma: {
            refer: "Tertiary health care centre",
            message: "Can lose eye sight."
        },
        any_history_of_foreign_body: {
            refer: "Tertiary health care centre",
            message: "Can lead to severe eye infection if not removed or permanent corneal damage."
        },
        none_eyeproblem: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];

    if (condition_met && fieldname !== "none_eyeproblem") {
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
frappe.ui.form.on('Anemia- Children', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_anemia_children_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_rcks': '#FF5722',
                'check_znsu': '#4CAF50'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control anemia_children field visibility
    if_hb_less_than_7_gmdl(frm) {
        show_red_flag(frm, 'if_hb_less_than_7_gmdl');
        frm.trigger("toggle_anemia_children_field");
    },
    anaemic_individual(frm) {
        show_red_flag(frm, 'anaemic_individual');
        frm.trigger("toggle_anemia_children_field");
    },
    if_hb_more_than_7_gmdl_to_less_than_11_gmdl(frm) {
        show_red_flag(frm, 'if_hb_more_than_7_gmdl_to_less_than_11_gmdl');
        frm.trigger("toggle_anemia_children_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_anemia_children_field");
    },

    // Anemia children select → controls section visibility
    anemia_children(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show anemia_children field if any red flag condition is met
    toggle_anemia_children_field(frm) {
        let show = (
            frm.doc.if_hb_less_than_7_gmdl ||
            frm.doc.anaemic_individual ||
            frm.doc.if_hb_more_than_7_gmdl_to_less_than_11_gmdl ||
            frm.doc.none
        );
        frm.toggle_display("anemia_children", show);
        if (show) {
            frm.set_df_property("anemia_children", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("anemia_children", "options", ["Yes", "No"]);
        } else {
            frm.set_value("anemia_children", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.anemia_children === "Yes");
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("check_rcks", show_sections);
        frm.toggle_display("check_znsu", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("anemia_children field value:", frm.doc.anemia_children); // Debugging
        if (frm.doc.anemia_children === "Yes") {
            console.log("check_rcks:", frm.doc.check_rcks); // Debugging
            console.log("check_znsu:", frm.doc.check_znsu); // Debugging
            if (!frm.doc.check_rcks) {
                frappe.throw("You didn’t complete Present Chief Complaints Section");
            }
            if (!frm.doc.check_znsu) {
                frappe.throw("You didn’t complete Physical Examination Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_rcks': '#FF5722', // Deep Orange
        'check_znsu': '#4CAF50'  // Green
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
        if_hb_less_than_7_gmdl: {
            refer: "Tertiary health care centre",
            message: "Needs blood transfusion."
        },
        anaemic_individual: {
            refer: "Tertiary health care centre",
            message: "It could be acute or chronic blood loss needs to be investigated."
        },
        if_hb_more_than_7_gmdl_to_less_than_11_gmdl: {
            refer: "Health centre/PHC/CHC",
            message: "Requires further evaluation and management."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
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
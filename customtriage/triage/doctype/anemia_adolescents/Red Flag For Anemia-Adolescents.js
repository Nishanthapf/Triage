frappe.ui.form.on('Anemia-Adolescents', {
    refresh(frm) {
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Ensure red flags section is always visible
        frm.trigger("toggle_anemia_adolescents_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'check_bdxg': '#FF5722',
                'check_xfez': '#4CAF50'
            })); // Debug
        }, 300);
    },

    // Symptom checkboxes → trigger red flags and control anemia_adolescents field visibility
    hb_lessthan_7(frm) {
        show_red_flag(frm, 'hb_lessthan_7');
        frm.trigger("toggle_anemia_adolescents_field");
    },
    anaemic_individual(frm) {
        show_red_flag(frm, 'anaemic_individual');
        frm.trigger("toggle_anemia_adolescents_field");
    },
    hb_morethan_7(frm) {
        show_red_flag(frm, 'hb_morethan_7');
        frm.trigger("toggle_anemia_adolescents_field");
    },
    none_anemia(frm) {
        show_red_flag(frm, 'none_anemia');
        frm.trigger("toggle_anemia_adolescents_field");
    },

    // Anemia adolescents select → controls section visibility
    anemia_adolescents(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show anemia_adolescents field if any red flag condition is met
    toggle_anemia_adolescents_field(frm) {
        let show = (
            frm.doc.hb_lessthan_7 ||
            frm.doc.anaemic_individual ||
            frm.doc.hb_morethan_7 ||
            frm.doc.none_anemia
        );
        frm.toggle_display("anemia_adolescents", show);
        if (show) {
            frm.set_df_property("anemia_adolescents", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("anemia_adolescents", "options", ["Yes", "No"]);
        } else {
            frm.set_value("anemia_adolescents", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected
    toggle_sections(frm) {
        let show_sections = (frm.doc.anemia_adolescents === "Yes");
        frm.toggle_display("section_break_opoc", show_sections);
        frm.toggle_display("detailed_obstetric_history_for_women_section", show_sections);
        frm.toggle_display("section_break_kvpg", show_sections);
        frm.toggle_display("check_bdxg", show_sections);
        frm.toggle_display("check_xfez", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle"); // Debug
        }, 300);
    },

    // Validation before save
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("anemia_adolescents field value:", frm.doc.anemia_adolescents); // Debugging
        if (frm.doc.anemia_adolescents === "Yes") {
            console.log("check_bdxg:", frm.doc.check_bdxg); // Debugging
            console.log("check_xfez:", frm.doc.check_xfez); // Debugging
            if (!frm.doc.check_bdxg) {
                frappe.throw("You didn’t complete Section 1");
            }
            if (!frm.doc.check_xfez) {
                frappe.throw("You didn’t complete Detailed Obstetric History Section");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'check_bdxg': '#FF5722', // Deep Orange
        'check_xfez': '#4CAF50'  // Green
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
        hb_lessthan_7: {
            refer: "Tertiary health care centre",
            message: "Needs blood transfusion."
        },
        anaemic_individual: {
            refer: "Tertiary health care centre",
            message: "It could be acute or chronic blood loss needs to be investigated."
        },
        hb_morethan_7: {
            refer: "Health centre/PHC/CHC",
            message: "Requires further evaluation and management."
        },
        none_anemia: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];
    if (condition_met && fieldname !== "none_anemia") {
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
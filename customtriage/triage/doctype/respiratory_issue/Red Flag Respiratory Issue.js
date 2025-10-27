frappe.ui.form.on('Respiratory Issue', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Always show red_flags_section
        frm.trigger("toggle_respiratory_field");
        frm.trigger("toggle_sections");
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors applied to checkboxes:", Object.keys({
                'select_ygoh': '#FF5722',
                'select_upnm': '#4CAF50',
                'select_umxs': '#2196F3',
                'select_beav': '#FFC107'
            })); // Debug
        }, 300);
    },
    // Child symptom checkboxes → trigger red flags and control respiratory_issue visibility
    if_the_child_is_breathless(frm) {
        show_red_flag(frm, 'if_the_child_is_breathless');
        frm.trigger("toggle_respiratory_field");
    },
    if_the_child_is_having_chest_in_drawing(frm) {
        show_red_flag(frm, 'if_the_child_is_having_chest_in_drawing');
        frm.trigger("toggle_respiratory_field");
    },
    if_the_child_is_drowsy_or_constantly_crying(frm) {
        show_red_flag(frm, 'if_the_child_is_drowsy_or_constantly_crying');
        frm.trigger("toggle_respiratory_field");
    },
    if_the_child_is_refusing_breast_feeding_or_any_feed(frm) {
        show_red_flag(frm, 'if_the_child_is_refusing_breast_feeding_or_any_feed');
        frm.trigger("toggle_respiratory_field");
    },
        none4(frm) {
        show_red_flag(frm, 'none4');
        frm.trigger("toggle_respiratory_field");
    },
    // Adult symptom checkboxes → trigger red flags and control respiratory_issue visibility
    high_fever_more_than_3_days(frm) {
        show_red_flag(frm, 'high_fever_more_than_3_days');
        frm.trigger("toggle_respiratory_field");
    },
    associated_with_chills(frm) {
        show_red_flag(frm, 'associated_with_chills');
        frm.trigger("toggle_respiratory_field");
    },
    discoloured_nasal_discharge_or_sputum_discolor(frm) {
        show_red_flag(frm, 'discoloured_nasal_discharge_or_sputum_discolor');
        frm.trigger("toggle_respiratory_field");
    },
    sputum(frm) {
        show_red_flag(frm, 'sputum');
        frm.trigger("toggle_respiratory_field");
    },
    finding_difficulty_to_swallow(frm) {
        show_red_flag(frm, 'finding_difficulty_to_swallow');
        frm.trigger("toggle_respiratory_field");
    },
    tender_lymphnodes_in_the_neck(frm) {
        show_red_flag(frm, 'tender_lymphnodes_in_the_neck');
        frm.trigger("toggle_respiratory_field");
    },
    breathing_difficulty(frm) {
        show_red_flag(frm, 'breathing_difficulty');
        frm.trigger("toggle_respiratory_field");
    },
    chest_pain(frm) {
        show_red_flag(frm, 'chest_pain');
        frm.trigger("toggle_respiratory_field");
    },
    any_change_in_the_sound_while_coughing(frm) {
        show_red_flag(frm, 'any_change_in_the_sound_while_coughing');
        frm.trigger("toggle_respiratory_field");
    },
    none(frm) {
        show_red_flag(frm, 'none');
        frm.trigger("toggle_respiratory_field");
    },
    // SPO2 field → trigger red flag check
    spo2(frm) {
        show_red_flag(frm, 'spo2');
        frm.trigger("toggle_respiratory_field");
    },
    // Fever field → trigger red flag check
    fever(frm) {
        show_red_flag(frm, 'fever');
        frm.trigger("toggle_respiratory_field");
    },
    // Screening select → controls section visibility
    respiratory_issue(frm) {
        frm.trigger("toggle_sections");
    },
    // Ensure only one of select_ygoh, select_upnm, select_umxs, select_beav is active
    select_ygoh(frm) {
        ensure_single_selection(frm, 'select_ygoh');
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after select_ygoh change"); // Debug
        }, 300);
    },
    select_upnm(frm) {
        ensure_single_selection(frm, 'select_upnm');
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after select_upnm change"); // Debug
        }, 300);
    },
    select_umxs(frm) {
        ensure_single_selection(frm, 'select_umxs');
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after select_umxs change"); // Debug
        }, 300);
    },
    select_beav(frm) {
        ensure_single_selection(frm, 'select_beav');
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after select_beav change"); // Debug
        }, 300);
    },
    // Helper: Show respiratory_issue if any red flag condition is met
    toggle_respiratory_field(frm) {
        let show = (
            frm.doc.if_the_child_is_breathless ||
            frm.doc.if_the_child_is_having_chest_in_drawing ||
            frm.doc.if_the_child_is_drowsy_or_constantly_crying ||
            frm.doc.if_the_child_is_refusing_breast_feeding_or_any_feed ||
            frm.doc.none4 ||
            frm.doc.high_fever_more_than_3_days ||
            frm.doc.associated_with_chills ||
            frm.doc.discoloured_nasal_discharge_or_sputum_discolor ||
            frm.doc.sputum ||
            frm.doc.finding_difficulty_to_swallow ||
            frm.doc.tender_lymphnodes_in_the_neck ||
            frm.doc.breathing_difficulty ||
            frm.doc.chest_pain ||
            frm.doc.any_change_in_the_sound_while_coughing ||
            frm.doc.none ||
            (frm.doc.fever > 100.4) ||
            (frm.doc.spo2 < 90)
        );
        // Show/hide the respiratory_issue field
        frm.toggle_display("respiratory_issue", show);
        // Set label and options dynamically
        if (show) {
            frm.set_df_property("respiratory_issue", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("respiratory_issue", "options", ["Yes", "No"]);
        } else {
            frm.set_value("respiratory_issue", "");
        }
    },
    // Helper: Show/hide form sections and fields based on respiratory_issue
    toggle_sections(frm) {
        let show_sections = (frm.doc.respiratory_issue === "Yes");
        // Toggle visibility of section breaks (except red_flags_section, which is always visible)
        frm.toggle_display("section_break_jrpo", show_sections);
        frm.toggle_display("if_fever_section", show_sections);
        frm.toggle_display("if_cough_section", show_sections);
        frm.toggle_display("if_cold_section", show_sections);
        frm.toggle_display("if_headache_section", show_sections);
        frm.toggle_display("section_break_tlbd", show_sections);
        frm.toggle_display("section_break_lgcz", show_sections);
        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_sayy", show_sections);
        frm.toggle_display("select_ygoh", show_sections);
        frm.toggle_display("select_upnm", show_sections);
        frm.toggle_display("select_umxs", show_sections);
        frm.toggle_display("select_beav", show_sections);
        frm.toggle_display("select_zfpp", show_sections);
        frm.toggle_display("select_ffsm", show_sections);
        setTimeout(() => {
            applyCheckboxColors(frm);
            console.log("Colors reapplied after toggle_sections"); // Debug
        }, 300);
    },
    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("respiratory_issue field value:", frm.doc.respiratory_issue); // Debugging
        if (frm.doc.respiratory_issue === "Yes") {
            console.log("check_sayy:", frm.doc.check_sayy); // Debugging
            console.log("select_ygoh:", frm.doc.select_ygoh); // Debugging
            console.log("select_upnm:", frm.doc.select_upnm); // Debugging
            console.log("select_umxs:", frm.doc.select_umxs); // Debugging
            console.log("select_beav:", frm.doc.select_beav); // Debugging
            console.log("select_zfpp:", frm.doc.select_zfpp); // Debugging
            console.log("select_ffsm:", frm.doc.select_ffsm); // Debugging
            if (!frm.doc.check_sayy) {
                frappe.throw("You didn’t complete Section Present Complaints");
            }
            if (!frm.doc.select_ygoh && !frm.doc.select_upnm && !frm.doc.select_umxs && !frm.doc.select_beav) {
                frappe.throw("You must select at least one option from Section If Fever, If Cough, If Cold, or If Headache");
            }
            if (!frm.doc.select_zfpp) {
                frappe.throw("You didn’t complete Section Past history");
            }
            if (!frm.doc.select_ffsm) {
                frappe.throw("You didn’t complete Section Family History and Laboratory Test");
            }
        }
    }
});

// Function to apply colors to checkbox fields
function applyCheckboxColors(frm) {
    const checkboxColors = {
        'select_ygoh': '#FF5722', // Deep Orange
        'select_upnm': '#4CAF50', // Green
        'select_umxs': '#2196F3', // Blue
        'select_beav': '#FFC107'  // Amber
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
        fever: {
            refer: frm.doc.fever > 104 ? "Tertiary health centre" : "Health center/PHC/CHC",
            message: frm.doc.fever > 104 ? "Probably pneumonia needs admission and monitoring. Give tepid sponge and refer." : "Fever between 100.4°F and 104°F requires evaluation."
        },
        if_the_child_is_breathless: {
            refer: "Tertiary health centre",
            message: "Probably pneumonia needs admission and monitoring."
        },
        if_the_child_is_having_chest_in_drawing: {
            refer: "Tertiary health centre",
            message: "Probably pneumonia needs admission and monitoring."
        },
        if_the_child_is_drowsy_or_constantly_crying: {
            refer: "Tertiary health centre",
            message: "Probably pneumonia needs admission and monitoring."
        },
        if_the_child_is_refusing_breast_feeding_or_any_feed: {
            refer: "Tertiary health centre",
            message: "Probably pneumonia needs admission and monitoring."
        },
        high_fever_more_than_3_days: {
            refer: "Health center/PHC/CHC",
            message: "Needs more investigation."
        },
        associated_with_chills: {
            refer: "Health center/PHC/CHC",
            message: "Needs more investigation."
        },
        discoloured_nasal_discharge_or_sputum_discolor: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        sputum: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        finding_difficulty_to_swallow: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        tender_lymphnodes_in_the_neck: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        breathing_difficulty: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        chest_pain: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        any_change_in_the_sound_while_coughing: {
            refer: "Health center/PHC/CHC",
            message: "Will need further investigation and antibiotics."
        },
        spo2: {
            refer: "Tertiary health centre",
            message: "Severe hypoxia leads to brain damage/death. It can be seen in severe asthma and pneumonia."
        },
        none: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };
    let condition_met = false;
    if (fieldname === "fever" && frm.doc.fever > 100.4) {
        condition_met = true;
    } else if (fieldname === "spo2" && frm.doc.spo2 < 90) {
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

// Helper function to ensure only one of select_ygoh, select_upnm, select_umxs, select_beav is active
function ensure_single_selection(frm, selected_field) {
    const fields = ['select_ygoh', 'select_upnm', 'select_umxs', 'select_beav'];
    fields.forEach(field => {
        if (field !== selected_field) {
            frm.set_value(field, ''); // Clear other fields
        }
    });
}
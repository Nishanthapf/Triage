// === Respiratory Issue.js ===
frappe.ui.form.on('Respiratory Issue', {
	refresh(frm) {
        if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }

        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }
    }
});

// === Age based red flags.js ===
frappe.ui.form.on('Respiratory Issue', {
    refresh: function(frm) {
        handle_age_based_sections(frm);
    },

    age: function(frm) {
        handle_age_based_sections(frm);
    }
});

function handle_age_based_sections(frm) {
    // Preferred column names you provided
    let child_column_name = 'red_flags_child';
    let adult_column_name = 'red_flags_adult';

    // List all child and adult checkbox fields (adjust if you have different names)
    const child_fields = [
        'child',
        'if_the_child_is_breathless',
        'if_the_child_is_having_chest_in_drawing',
        'if_the_child_is_drowsy_or_constantly_crying',
        'if_the_child_is_refusing_breast_feeding_or_any_feed',
        'none4'
    ];

    const adult_fields = [
        'adult',
        'high_fever_more_than_3_days',
        'associated_with_chills',
        'discoloured_nasal_discharge_or_sputum_discolor',
        'sputum',
        'finding_difficulty_to_swallow',
        'tender_lymphnodes_in_the_neck',
        'breathing_difficulty',
        'chest_pain',
        'any_change_in_the_sound_while_coughing',
        'none'
    ];

    // Try to detect the actual column break fieldnames by label if the provided names don't exist
    function detect_column_by_label(frm, keyword) {
        keyword = keyword.toLowerCase();
        if (!frm.meta || !frm.meta.fields) return null;
        for (let metaField of frm.meta.fields) {
            if (!metaField.fieldtype) continue;
            const ft = metaField.fieldtype.toLowerCase();
            if ((ft === 'column break' || ft === 'section break' || ft === 'column') && metaField.label) {
                if (metaField.label.toLowerCase().includes(keyword)) {
                    return metaField.fieldname;
                }
            }
        }
        return null;
    }

    // If the named columns don't exist in the form, try to auto-detect
    if (!frm.fields_dict[child_column_name]) {
        const detected = detect_column_by_label(frm, 'child');
        if (detected) {
            console.log('Auto-detected child column:', detected);
            child_column_name = detected;
        }
    }
    if (!frm.fields_dict[adult_column_name]) {
        const detected = detect_column_by_label(frm, 'adult');
        if (detected) {
            console.log('Auto-detected adult column:', detected);
            adult_column_name = detected;
        }
    }

    // Hide both columns/sections first (if found)
    if (frm.fields_dict[child_column_name]) {
        try { frm.toggle_display(child_column_name, false); } catch (e) { console.warn(e); }
    }
    if (frm.fields_dict[adult_column_name]) {
        try { frm.toggle_display(adult_column_name, false); } catch (e) { console.warn(e); }
    }

    // Hide individual fields by default (covers cases where column break doesn't hide them)
    child_fields.forEach(fn => {
        if (frm.fields_dict[fn]) frm.toggle_display(fn, false);
    });
    adult_fields.forEach(fn => {
        if (frm.fields_dict[fn]) frm.toggle_display(fn, false);
    });

    // If age is not present, leave everything hidden
    if (frm.doc.age === undefined || frm.doc.age === null || frm.doc.age === '') {
        console.log('No age entered — both child/adult sections remain hidden.');
        return;
    }

    // Parse age safely
    const age = Number(frm.doc.age);
    if (!Number.isFinite(age)) {
        console.warn('Age is not a valid number:', frm.doc.age);
        return;
    }

    // If age <= 5 → show child only, hide adult
    if (age <= 5) {
        // Show column (if available)
        if (frm.fields_dict[child_column_name]) frm.toggle_display(child_column_name, true);
        if (frm.fields_dict[adult_column_name]) frm.toggle_display(adult_column_name, false);

        // Show child fields and hide+clear adult fields
        child_fields.forEach(fn => {
            if (frm.fields_dict[fn]) frm.toggle_display(fn, true);
        });
        adult_fields.forEach(fn => {
            if (frm.fields_dict[fn]) {
                frm.toggle_display(fn, false);
                // frm.set_value(fn, 0);
            }
        });

        console.log('Age <= 5: shown child red flags only');
        return;
    }

    // Age > 5 → show adult only, hide child
    if (age > 5) {
        if (frm.fields_dict[adult_column_name]) frm.toggle_display(adult_column_name, true);
        if (frm.fields_dict[child_column_name]) frm.toggle_display(child_column_name, false);

        adult_fields.forEach(fn => {
            if (frm.fields_dict[fn]) frm.toggle_display(fn, true);
        });
        child_fields.forEach(fn => {
            if (frm.fields_dict[fn]) {
                frm.toggle_display(fn, false);
                // frm.set_value(fn, 0);
            }
        });

        console.log('Age > 5: shown adult red flags only');
        return;
    }
}

// === Red Flag Respiratory Issue.js ===
frappe.ui.form.on('Respiratory Issue', {
    refresh(frm) {
        frm.toggle_display("red_flags_section", true);

        setTimeout(() => {
            frm.trigger("toggle_respiratory_field");
            frm.trigger("toggle_sections");
            applyCheckboxColors(frm);
        }, 100);
    },

    // Symptom checkboxes → re-evaluate section visibility
    fever(frm) { frm.trigger("toggle_sections"); },
    cough(frm) { frm.trigger("toggle_sections"); },
    cold(frm) { frm.trigger("toggle_sections"); },
    headache(frm) { frm.trigger("toggle_sections"); },

    // Section completion checkboxes → recolor only
    select_ygoh(frm) { recolor_after_click(frm); },
    select_upnm(frm) { recolor_after_click(frm); },
    select_umxs(frm) { recolor_after_click(frm); },
    select_beav(frm) { recolor_after_click(frm); },

    // Red flag checkboxes → show popup + re-evaluate gatekeeper visibility
    if_the_child_is_breathless(frm) { show_red_flag(frm, 'if_the_child_is_breathless'); frm.trigger("toggle_respiratory_field"); },
    if_the_child_is_having_chest_in_drawing(frm) { show_red_flag(frm, 'if_the_child_is_having_chest_in_drawing'); frm.trigger("toggle_respiratory_field"); },
    if_the_child_is_drowsy_or_constantly_crying(frm) { show_red_flag(frm, 'if_the_child_is_drowsy_or_constantly_crying'); frm.trigger("toggle_respiratory_field"); },
    if_the_child_is_refusing_breast_feeding_or_any_feed(frm) { show_red_flag(frm, 'if_the_child_is_refusing_breast_feeding_or_any_feed'); frm.trigger("toggle_respiratory_field"); },
    high_fever_more_than_3_days(frm) { show_red_flag(frm, 'high_fever_more_than_3_days'); frm.trigger("toggle_respiratory_field"); },
    associated_with_chills(frm) { show_red_flag(frm, 'associated_with_chills'); frm.trigger("toggle_respiratory_field"); },
    discoloured_nasal_discharge_or_sputum_discolor(frm) { show_red_flag(frm, 'discoloured_nasal_discharge_or_sputum_discolor'); frm.trigger("toggle_respiratory_field"); },
    sputum(frm) { show_red_flag(frm, 'sputum'); frm.trigger("toggle_respiratory_field"); },
    finding_difficulty_to_swallow(frm) { show_red_flag(frm, 'finding_difficulty_to_swallow'); frm.trigger("toggle_respiratory_field"); },
    tender_lymphnodes_in_the_neck(frm) { show_red_flag(frm, 'tender_lymphnodes_in_the_neck'); frm.trigger("toggle_respiratory_field"); },
    breathing_difficulty(frm) { show_red_flag(frm, 'breathing_difficulty'); frm.trigger("toggle_respiratory_field"); },
    chest_pain(frm) { show_red_flag(frm, 'chest_pain'); frm.trigger("toggle_respiratory_field"); },
    any_change_in_the_sound_while_coughing(frm) { show_red_flag(frm, 'any_change_in_the_sound_while_coughing'); frm.trigger("toggle_respiratory_field"); },
    none4(frm) { frm.trigger("toggle_respiratory_field"); },
    none(frm) { frm.trigger("toggle_respiratory_field"); },

    // Gatekeeper field → controls template visibility
    respiratory_issue(frm) {
        frm.trigger("toggle_sections");
    },

    // ======================================
    // GATEKEEPER LOGIC: Template only opens on "Yes"
    // ======================================
    toggle_sections(frm) {
        const shouldShowTemplate = frm.doc.respiratory_issue === "Yes";

        frm.toggle_display("section_break_jrpo", shouldShowTemplate);
        frm.toggle_display("section_break_tlbd", shouldShowTemplate);
        frm.toggle_display("section_break_lgcz", shouldShowTemplate);
        frm.toggle_display("check_sayy", shouldShowTemplate);

        // Show symptom detail sections based on symptom checkboxes (not completion checkboxes)
        frm.toggle_display("if_fever_section", shouldShowTemplate && !!frm.doc.fever);
        frm.toggle_display("if_cough_section", shouldShowTemplate && !!frm.doc.cough);
        frm.toggle_display("if_cold_section", shouldShowTemplate && !!frm.doc.cold);
        frm.toggle_display("if_headache_section", shouldShowTemplate && !!frm.doc.headache);

        if (!shouldShowTemplate) {
            const fieldsToClear = [
                "check_sayy",
                "select_ygoh",
                "select_upnm",
                "select_umxs",
                "select_beav"
            ];
            fieldsToClear.forEach(field => {
                if (frm.fields_dict[field] && frm.doc[field]) {
                    frm.set_value(field, 0);
                }
            });
        }

        setTimeout(() => applyCheckboxColors(frm), 200);
    },

    // Gatekeeper visibility: show only when any real red-flag is checked
    toggle_respiratory_field(frm) {
        const hasRealRedFlag = (
            frm.doc.if_the_child_is_breathless === 1 ||
            frm.doc.if_the_child_is_having_chest_in_drawing === 1 ||
            frm.doc.if_the_child_is_drowsy_or_constantly_crying === 1 ||
            frm.doc.if_the_child_is_refusing_breast_feeding_or_any_feed === 1 ||
            frm.doc.high_fever_more_than_3_days === 1 ||
            frm.doc.associated_with_chills === 1 ||
            frm.doc.discoloured_nasal_discharge_or_sputum_discolor === 1 ||
            frm.doc.sputum === 1 ||
            frm.doc.finding_difficulty_to_swallow === 1 ||
            frm.doc.tender_lymphnodes_in_the_neck === 1 ||
            frm.doc.breathing_difficulty === 1 ||
            frm.doc.chest_pain === 1 ||
            frm.doc.any_change_in_the_sound_while_coughing === 1
        );

        frm.toggle_display("respiratory_issue", hasRealRedFlag);

        if (hasRealRedFlag) {
            frm.set_df_property("respiratory_issue", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("respiratory_issue", "options", "Yes\nNo");
            frm.set_df_property("respiratory_issue", "reqd", 1);
        } else {
            if (frm.doc.respiratory_issue) {
                frm.set_value("respiratory_issue", "");
            }
            frm.set_df_property("respiratory_issue", "reqd", 0);
        }
    },

    // Validate: all checks only apply when the clinical template is open (respiratory_issue === "Yes")
    validate(frm) {
        if (frm.doc.respiratory_issue === "Yes") {
            if (!frm.doc.check_sayy) {
                frappe.throw("Please complete the Present Complaints section.");
            }
            if (frm.doc.fever && !frm.doc.select_ygoh) {
                frappe.throw("Please complete the 'If Fever' section.");
            }
            if (frm.doc.cough && !frm.doc.select_upnm) {
                frappe.throw("Please complete the 'If Cough' section.");
            }
            if (frm.doc.cold && !frm.doc.select_umxs) {
                frappe.throw("Please complete the 'If Cold' section.");
            }
            if (frm.doc.headache && !frm.doc.select_beav) {
                frappe.throw("Please complete the 'If Headache' section.");
            }
            if (!frm.doc.select_zfpp) {
                frappe.throw("Please complete the Past History section.");
            }
            if (!frm.doc.select_ffsm) {
                frappe.throw("Please complete the Family History & Laboratory Test section.");
            }
        }
    }
});

function applyCheckboxColors(frm) {
    const checkboxColors = {
        'select_ygoh': '#FF5722',
        'select_upnm': '#4CAF50',
        'select_umxs': '#2196F3',
        'select_beav': '#FFC107'
    };

    Object.keys(checkboxColors).forEach(fieldname => {
        if (!frm.fields_dict[fieldname]) return;
        const color = checkboxColors[fieldname];
        const checkbox = frm.fields_dict[fieldname].$wrapper.find('input[type="checkbox"]');

        checkbox.css({
            'appearance': 'none',
            'width': '16px',
            'height': '16px',
            'border': '2px solid #ccc',
            'border-radius': '4px',
            'cursor': 'pointer',
            'background-color': checkbox.is(':checked') ? color : '#fff'
        });

        // Namespaced event so Frappe's own change listener is not affected
        checkbox.off('change.colorize').on('change.colorize', function () {
            $(this).css('background-color', this.checked ? color : '#fff');
        });
    });
}

function recolor_after_click(frm) {
    setTimeout(() => applyCheckboxColors(frm), 150);
}

function show_red_flag(frm, fieldname) {
    const red_flags = {
        if_the_child_is_breathless: {
            refer: "PHC/CHC",
            message: "Child breathless – possible severe pneumonia. Immediate referral needed."
        },
        if_the_child_is_having_chest_in_drawing: {
            refer: "PHC/CHC",
            message: "Chest indrawing in child – indicates respiratory distress. Refer immediately."
        },
        if_the_child_is_drowsy_or_constantly_crying: {
            refer: "PHC/CHC",
            message: "Child drowsy or constantly crying – sign of serious illness. Urgent evaluation required."
        },
        if_the_child_is_refusing_breast_feeding_or_any_feed: {
            refer: "PHC/CHC",
            message: "Child refusing feeds – risk of dehydration or infection. Refer urgently."
        },
        high_fever_more_than_3_days: {
            refer: "PHC/CHC",
            message: "High fever >3 days – possible infection like pneumonia. Refer for evaluation."
        },
        associated_with_chills: {
            refer: "PHC/CHC",
            message: "Fever with chills – may indicate malaria or bacterial infection. Refer."
        },
        discoloured_nasal_discharge_or_sputum_discolor: {
            refer: "PHC/CHC",
            message: "Discolored nasal discharge/sputum – likely bacterial sinusitis or bronchitis. Refer."
        },
        sputum: {
            refer: "PHC/CHC",
            message: "Bloody sputum – possible TB or lung cancer. Urgent referral and sputum test needed."
        },
        finding_difficulty_to_swallow: {
            refer: "PHC/CHC",
            message: "Difficulty swallowing – could be epiglottitis or abscess. Refer immediately."
        },
        tender_lymphnodes_in_the_neck: {
            refer: "PHC/CHC",
            message: "Tender neck lymph nodes – sign of infection or lymphoma. Refer for evaluation."
        },
        breathing_difficulty: {
            refer: "PHC/CHC",
            message: "Breathing difficulty – possible asthma exacerbation or pneumonia. Refer urgently."
        },
        chest_pain: {
            refer: "PHC/CHC",
            message: "Chest pain – rule out cardiac cause or pleurisy. Refer immediately."
        },
        any_change_in_the_sound_while_coughing: {
            refer: "PHC/CHC",
            message: "Change in cough sound – possible whooping cough or foreign body. Refer."
        }
    };

    if (frm.doc[fieldname] && red_flags[fieldname]) {
        const info = red_flags[fieldname];
        frappe.msgprint({
            title: "Red Flag Warning",
            message: "Refer to: " + info.refer + "<br>Note: " + info.message,
            indicator: "red"
        });
    }
}

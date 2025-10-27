frappe.ui.form.on('Jaundice', {
    refresh: function(frm) {
        handle_age_based_sections(frm);
    },

    age: function(frm) {
        handle_age_based_sections(frm);
    }
});

function handle_age_based_sections(frm) {
    // Preferred column names for Jaundice doctype
    let child_column_name = 'red_flag_child';
    let adult_column_name = 'red_flag_adult';

    // List all child and adult fields
    const child_fields = [
        'children',
        'jaundice',
        'abdominal',
        'child_is_confusedagitated_or_drowsy',
        'fever_jaundice',
        'excessive_vomiting',
        'not_passing_urine',
        'none_jaundice'
    ];

    const adult_fields = [
        'adults',
        'any_jaundice_refer_for_lab_test',
        'severe_abdominal_pain_or_tenderness',
        'patient_is_confusedagitated_or_drowsy',
        'high_fever',
        'vomiting_blood',
        'blood_in_stool_or_black_stoolnot_passing_urine',
        'any_painful_lymphnode',
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

    // Hide individual fields by default
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
        if (frm.fields_dict[child_column_name]) frm.toggle_display(child_column_name, true);
        if (frm.fields_dict[adult_column_name]) frm.toggle_display(adult_column_name, false);

        child_fields.forEach(fn => {
            if (frm.fields_dict[fn]) frm.toggle_display(fn, true);
        });
        adult_fields.forEach(fn => {
            if (frm.fields_dict[fn]) {
                frm.toggle_display(fn, false);
                frm.set_value(fn, 0);
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
                frm.set_value(fn, 0);
            }
        });

        console.log('Age > 5: shown adult red flags only');
        return;
    }
}

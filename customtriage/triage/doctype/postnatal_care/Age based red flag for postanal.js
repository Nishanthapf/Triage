frappe.ui.form.on('Postnatal Care', {
    refresh: function(frm) {
        handle_age_based_sections(frm);
    },

    age: function(frm) {
        handle_age_based_sections(frm);
    }
});

function handle_age_based_sections(frm) {
    // Preferred column names for Postnatal Care doctype
    let child_column_name = 'red_flags_child';
    let mother_column_name = 'red_flags_mother';

    // List all child and mother fields
    const child_fields = [
        'child',
        'child_feeding_is_reduced',
        'child_is_drowsy',
        'respiratory_rate_is_more_than__60_beats_per_minute',
        'chest_indrawing',
        'abdominal_distension',
        'jaundice',
        'child_not_passing_urine_and_stool',
        'fever_more_than_normal',
        'cough_or_cold',
        'none'
    ];

    const mother_fields = [
        'mother',
        'breathlessness',
        'mental_issues',
        'pain_breast',
        'none_mother'
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
    if (!frm.fields_dict[mother_column_name]) {
        const detected = detect_column_by_label(frm, 'mother');
        if (detected) {
            console.log('Auto-detected mother column:', detected);
            mother_column_name = detected;
        }
    }

    // Hide both columns/sections first (if found)
    if (frm.fields_dict[child_column_name]) {
        try { frm.toggle_display(child_column_name, false); } catch (e) { console.warn(e); }
    }
    if (frm.fields_dict[mother_column_name]) {
        try { frm.toggle_display(mother_column_name, false); } catch (e) { console.warn(e); }
    }

    // Hide individual fields by default
    child_fields.forEach(fn => {
        if (frm.fields_dict[fn]) frm.toggle_display(fn, false);
    });
    mother_fields.forEach(fn => {
        if (frm.fields_dict[fn]) frm.toggle_display(fn, false);
    });

    // If age is not present, leave everything hidden
    if (frm.doc.age === undefined || frm.doc.age === null || frm.doc.age === '') {
        console.log('No age entered — both child/mother sections remain hidden.');
        return;
    }

    // Parse age safely
    const age = Number(frm.doc.age);
    if (!Number.isFinite(age)) {
        console.warn('Age is not a valid number:', frm.doc.age);
        return;
    }

    // If age <= 5 → show child only, hide mother
    if (age <= 5) {
        if (frm.fields_dict[child_column_name]) frm.toggle_display(child_column_name, true);
        if (frm.fields_dict[mother_column_name]) frm.toggle_display(mother_column_name, false);

        child_fields.forEach(fn => {
            if (frm.fields_dict[fn]) frm.toggle_display(fn, true);
        });
        mother_fields.forEach(fn => {
            if (frm.fields_dict[fn]) {
                frm.toggle_display(fn, false);
                frm.set_value(fn, 0);
            }
        });

        console.log('Age <= 5: shown child red flags only');
        return;
    }

    // Age > 5 → show mother only, hide child
    if (age > 5) {
        if (frm.fields_dict[mother_column_name]) frm.toggle_display(mother_column_name, true);
        if (frm.fields_dict[child_column_name]) frm.toggle_display(child_column_name, false);

        mother_fields.forEach(fn => {
            if (frm.fields_dict[fn]) frm.toggle_display(fn, true);
        });
        child_fields.forEach(fn => {
            if (frm.fields_dict[fn]) {
                frm.toggle_display(fn, false);
                frm.set_value(fn, 0);
            }
        });

        console.log('Age > 5: shown mother red flags only');
        return;
    }
}

frappe.ui.form.on('Screening for Diabetes', {
    refresh: function(frm) {
        // Add custom CSS for checkbox colors
        const custom_css = `
            /* Style for section_mydq_completed checkbox */
            input[name="section_mydq_completed"]:checked {
                accent-color: #4CAF50; /* Green */
            }
            /* Style for section_yjlm_completed checkbox */
            input[name="section_yjlm_completed"]:checked {
                accent-color: #2196F3; /* Blue */
            }
            /* Style for check_wtkw_completed checkbox */
            input[name="check_wtkw_completed"]:checked {
                accent-color: #FFC107; /* Amber */
            }
            /* Style for section_gtme_completed checkbox */
            input[name="section_gtme_completed"]:checked {
                accent-color: #E91E63; /* Pink */
            }
        `;
        // Inject the CSS into the form
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = custom_css;
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    // Trigger on change for all relevant checkboxes
    loose_stools_with_dehydration: function(frm) {
        show_red_flag(frm, 'loose_stools_with_dehydration');
    },
    severe_vomiting: function(frm) {
        show_red_flag(frm, 'severe_vomiting');
    },
    any_foul_smelling_ulcer: function(frm) {
        show_red_flag(frm, 'any_foul_smelling_ulcer');
    },
    tooth_infection: function(frm) {
        show_red_flag(frm, 'tooth_infection');
    },
    swelling_of_legs: function(frm) {
        show_red_flag(frm, 'swelling_of_legs');
    },
    fever_with_dysuria: function(frm) {
        show_red_flag(frm, 'fever_with_dysuria');
    },
    high_fever: function(frm) {
        show_red_flag(frm, 'high_fever');
    },
    check_hmpy: function(frm) {
        show_red_flag(frm, 'check_hmpy'); // New diabetic
    }
});

// Function to show the red flag message
function show_red_flag(frm, fieldname) {
    const red_flags = {
        'loose_stools_with_dehydration': {
            refer: 'Health center / PHC / CHC',
            message: 'Diabetic with dehydration can go into hypoglycemia soon.'
        },
        'severe_vomiting': {
            refer: 'Health center / PHC / CHC',
            message: 'Diabetic with dehydration can go into hypoglycemia soon.'
        },
        'any_foul_smelling_ulcer': {
            refer: 'Health center / PHC / CHC',
            message: 'Infection needs IV antibiotics, daily dressing, and continuous GRBS monitoring.'
        },
        'tooth_infection': {
            refer: 'Health center / PHC / CHC',
            message: 'Can lead to high blood sugar level.'
        },
        'swelling_of_legs': {
            refer: 'Health center / PHC / CHC',
            message: 'Could indicate kidney damage.'
        },
        'fever_with_dysuria': {
            refer: 'Health center / PHC / CHC',
            message: 'Urinary infection needs antibiotics.'
        },
        'high_fever': {
            refer: 'Health center / PHC / CHC',
            message: 'Requires lab test to determine cause.'
        },
        'check_hmpy': {
            refer: 'Health center / PHC / CHC',
            message: 'New diabetic, needs regular monitoring.'
        }
    };

    if (frm.doc[fieldname]) {
        let info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: __('🚩 Red Flag Warning'),
                message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
                indicator: 'red'
            });
        }
    }
}
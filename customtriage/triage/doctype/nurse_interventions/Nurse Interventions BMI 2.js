frappe.ui.form.on("Nurse Interventions", {
    refresh(frm) {
         if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }

        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }
        setTimeout(() => {
            calculate_bmi_and_category(frm);
        }, 500);
    },

    height: function (frm) {
        if (!frm.doc.height) {
            frappe.msgprint(__('Please enter a valid height'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    },

    weight: function (frm) {
        if (!frm.doc.weight) {
            frappe.msgprint(__('Please enter a valid weight'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    }
});

function calculate_bmi_and_category(frm) {
    let height = frm.doc.height;
    let weight = frm.doc.weight;

    if (height && weight) {
        let height_in_m = height / 100;
        let bmi = weight / (height_in_m * height_in_m);
        bmi = parseFloat(bmi).toFixed(2);

        frm.set_value('bmi', bmi);

        let category = '';

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        frm.set_value('bmi_category', category);

        setTimeout(() => {
            apply_bmi_color(frm);
        }, 300); 
    } else {
        frm.set_value('bmi', '');
        frm.set_value('bmi_category', '');
        apply_bmi_color(frm, true);
    }
}

function apply_bmi_color(frm, clear = false) {
    let category = frm.doc.bmi_category;
    let color = '';

    if (!clear) {
        if (category === 'Underweight') {
            color = '#FFC107'; 
        } else if (category === 'Normal') {
            color = '#28A745';
        } else if (category === 'Overweight') {
            color = '#FD7E14'; 
        } else if (category === 'Obese') {
            color = '#DC3545'; 
        }
    }
    let bmiField = frm.get_field('bmi');
    if (bmiField) {
        let target = bmiField.$wrapper.find('input, .control-value');
        target.css({
            "background-color": color || "",
            "color": color ? "#fff" : ""
        });
    }

    let bmiCategoryField = frm.get_field('bmi_category');
    if (bmiCategoryField) {
        let target = bmiCategoryField.$wrapper.find('input, select, .control-value');
        target.css({
            "background-color": color || "",
            "color": color ? "#fff" : ""
        });
    }
}

frappe.ui.form.on('Postnatal Care', {
    no_of_birth: function(frm) {
        const count = cint(frm.doc.no_of_birth) || 0;

        // Gender fields
        frm.set_df_property('gender_of_the_baby', 'hidden', count < 1);
        frm.set_df_property('baby_gender', 'hidden', count < 2);

        // Birth weight fields
        frm.set_df_property('baby_birth_weight', 'hidden', count < 1);
        frm.set_df_property('birth_weight__of_the_baby', 'hidden', count < 2);

        // Refresh fields to apply visibility change
        frm.refresh_fields([
            'gender_of_the_baby',
            'baby_gender',
            'baby_birth_weight',
            'birth_weight__of_the_baby',
        ]);
    },

    onload: function(frm) {
        frm.trigger('no_of_birth');  // Apply logic on load
    }
});

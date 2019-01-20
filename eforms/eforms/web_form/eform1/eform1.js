//Note: to make any field read only (for the client side) you just add the attribute "disabled" with the vale of "1"
// to the field element using js setAttribute an to set field to read and write just remove "disabled" attribute from the field element.

// add fields which you want to be read only based on status 
const watchFields = ['supplier', 'contact', 'description']

// check if submitted and show success message to the user.
function isSubmitted() {
    if(web_form_settings.doc_name) {
        frappe.call({
            method: "eforms.api.get_seen",
            args: {dt: web_form_settings.web_form_doctype, dn: web_form_settings.doc_name},
            callback: function(r) {
               if (r.message == 0) {
                
                // Edit the message as needed.
                const success_title = 'Info Submitted Successfully.';
                const success_msg = `<p>Your ticket ${web_form_settings.doc_name} have been submitted successfully.</p>
                                         <p><a href=\"/${web_form_settings.web_form_name}\" 
                                         class=\"btn btn-sm btn-default\">Back to ${web_form_settings.web_form_doctype}'s list</a>
                                     </p>`;
                frappe.msgprint(success_msg, success_title);
                frappe.call({
                    method: "eforms.api.set_seen",
                    args: {dt: web_form_settings.web_form_doctype, dn: web_form_settings.doc_name},
                    callback: function(r) {
                        console.log(r)
                    }
                });
               }
            }
        });
    }
}
function set_props() {
    let sts = document.querySelector('div.control-value');
        // if save button clicked and the status is Completed then set fields as Read Only (Client side).
        if (sts.innerHTML == "Completed"){
            // set the required fields to read only
            for (field in watchFields){
                let targetField = document.querySelector(`[autocomplete][data-fieldtype][data-fieldname="${watchFields[field]}"]`);
                // save the original value of the field
                let tmpInnerHtml = targetField.value;
                // inject frappe style of Read Only and restore the original fields values.
                targetField.parentElement.innerHTML = `<div class="control-input-wrapper">
                    <div class="control-input" style="display: none;"></div>
                    <div class="control-value like-disabled-input" style="">${tmpInnerHtml}</div>
                    <p class="help-box small text-muted hidden-xs"></p>
                </div>`
            }
        }        
    // check if submitted to the server and show message
    setTimeout(isSubmitted, 1000);
}
frappe.ready(function() {
    // bind events here

    // give some time for the web form fields to be loaded.
    setTimeout(set_props, 500);

        // hook the upper save button
    document.getElementsByClassName("btn-primary")[0].addEventListener("click", function(e) {
        setTimeout(set_props, 600);
    });
    // hook the buttom save button
    document.getElementsByClassName("btn-primary")[1].addEventListener("click", function(e) {
        page_refresh(e);
    });
});
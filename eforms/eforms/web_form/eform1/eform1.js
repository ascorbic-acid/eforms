//Note: to make any field read only (for the client side) you just add the attribute "disabled" with the vale of "1"
// to the field element using js setAttribute an to set field to read and write just remove "disabled" attribute from the field element.

// add fields (field name of web form) which you want to be read only based on status.
const watchFields = ['supplier', 'contact', 'description']

// check if submitted and show success message to the user.
function isSubmitted(META_seen) {
    if(web_form_settings.doc_name) {
        console.log("yes!", web_form_settings.doc_name)
        if (META_seen.value == "no") {
            // Edit the message as needed.
            const success_title = 'Info Submitted Successfully.';
            const success_msg = `<p>Your ticket ${web_form_settings.doc_name} have been submitted successfully.</p>
                                     <p><a href=\"/${web_form_settings.web_form_name}\" 
                                     class=\"btn btn-sm btn-default\">Back to ${web_form_settings.web_form_doctype}'s list</a>
                                 </p>`;
            frappe.msgprint(success_msg, success_title);
            // set the web form as seen and save it.
            META_seen.value = "yes";
            document.getElementsByClassName("btn btn-primary")[0].click();
        }
    }
}
function set_props() {
    // if in web form return 
    let isListMenu = document.getElementsByClassName("btn btn-primary")[0].innerHTML.trim();
    if (isListMenu == "New"){
        return false
    }
    let sts = document.querySelector('[data-fieldtype][data-fieldname="status"]');
    let META_seen = document.querySelector('[data-fieldtype][data-fieldname="meta_seen"]');
    META_seen.parentElement.style.visibility = "hidden";
    
    // if web form is new dont make api call
        if(web_form_settings.doc_name){
            frappe.call({
                method: "eforms.api.get_ticket_status",
                args: {"dt": web_form_settings.web_form_doctype, "dn": web_form_settings.doc_name},
                callback: function(r) {
                    if (r.message == "Completed"){
                        // set the status field from the api end point value (get_ticket_status)
                        sts.value = r.message;
                        // set the required fields to read only
                        for (field in watchFields){
                            let targetField = document.querySelector(`[data-fieldtype][data-fieldname="${watchFields[field]}"]`).setAttribute("disabled", "1");
                        }
                    }
                }
            });
        }
    // check if submitted to the server and show message
    setTimeout(function(){
        isSubmitted(META_seen);
    }, 1000);
}
frappe.ready(function() {
    // bind events here

    // give some time for the web form fields to be loaded.
    setTimeout(set_props, 550);
});
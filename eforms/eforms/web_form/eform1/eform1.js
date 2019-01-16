//Note: to make any field read only (for the client side) you just add the attribute "disabled" with the vale of "1"
// to the field element using js setAttribute an to set field to read and write just remove "disabled" attribute from the field element.

// Add Here Any fields names which you want to keep tracking.
const fields = ['supplier', 'contact', 'description']

// check if submitted and show success message to the user.
function isSubmitted() {
    if(web_form_settings.doc_name) {
        frappe.call({
            method: "eforms.api.get_seen",
            args: {"dt": web_form_settings.web_form_doctype, "dn": web_form_settings.doc_name},
            callback: function(r) {
               if (r.message == 0) {
                console.log("correct")
                // Edit the message as needed.
                const success_title = 'Info Submitted Successfully.';
                const success_msg = `<p>Your ticket ${web_form_settings.doc_name} have been submitted successfully.</p>
                                     <p><a href=\"/\" class=\"btn btn-sm btn-default\">Done</a></p>`;
                frappe.msgprint(success_msg, success_title);
                frappe.call({
                    method: "eforms.api.set_seen",
                    args: {"dt": web_form_settings.web_form_doctype, "dn": web_form_settings.doc_name},
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
    let sts = document.querySelector('[data-fieldname="status"]');
    let fieldStatus = sts.innerHTML;
    // if save button clicked and the status is Completed then set fields as Read Only (Client side).
    if(fieldStatus =="Open" || fieldStatus == null) {
        sts.innerHTML = `<label class="control-label" style="padding-right: 0px;" for="sts">Status</label> <br> 
        <span id="sts" class="indicator green"><span class="hidden-xs">${fieldStatus}</span></span>`
    } 
    else if (fieldStatus == "Completed"){
        sts.innerHTML = `<label class="control-label" style="padding-right: 0px;" for="sts">Status</label> <br> 
        <span id="sts" class="indicator grey"><span class="hidden-xs">${fieldStatus}</span></span>`
        for(let field in fields){
            document.querySelector(`[placeholder][data-fieldtype][data-fieldname="${fields[field]}"]`).setAttribute("disabled", "1")
        }

    }
    // check if submitted to the server and show message
    setTimeout(isSubmitted, 1000);
}
frappe.ready(function() {
    // bind events here

    // give some time for the web form fields to be loaded.
    setTimeout(set_props, 800);

        // hook the upper save button
    document.getElementsByClassName("btn-primary")[0].addEventListener("click", function(e) {
        setTimeout(set_props, 600);
    });
    // hook the buttom save button
    document.getElementsByClassName("btn-primary")[1].addEventListener("click", function(e) {
        page_refresh(e);
    });
});
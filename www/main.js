
var CONTACTS=[];
var SELECTED_CONTACT;

$(document).ready(function(){
    $("#main").bind("panelbeforeload", startApp);
    
    $("#detail").bind("panelbeforeload", function(){
        var contact=CONTACTS[SELECTED_CONTACT];
        $("a#fullName").text(contact.name);
        $("a#emailData").text(contact.email);
        $("li#callAction").html('<a  href="tel:'+contact.phone+'" >Make Call</a>');
        $("li#smsAction").html('<a  href="sms:'+contact.phone+'" >Send Sms</a>');
    });
            
    //request list from web
    $.getJSON( "http://keepr.evansofts.com/list", function( data ) {
        $('ul#staffList li').remove();
        CONTACTS=[];
        $.each( data, function( key, contact ){
            CONTACTS.push(contact);
             var tag='<li><a href="#detail" onclick="SELECTED_CONTACT='+key+'">'+contact.name+'</a></li>';        
             $('ul#staffList').append(tag);
        });
        
    }).fail(function() {
       var opts={
            message:"Please Check your connection!",
            position:"tc",
            delay:2000,
            autoClose:true,
            type:"error"
        };
        $.afui.toast(opts);
    });
    
    $("#register").on("click", function(){
        register();
    });
            

});


function startApp(){
    // clears all back button history
    $.afui.clearHistory();
    $.ui.useOSThemes = true;
    

}


function register(){
    var name=$("#name").val();
    var email=$("#email").val();
    var phone=$("#phone").val();
        
    // SIGNUP SERVER CALL CODE GOES HERE
    $.post("http://keepr.evansofts.com/signup",{'name': name,'email': email, 'phone': phone},
    function(data, status){
        if(data==='ok'){
            $.afui.loadContent("#main", null, null, "fade");
            var opts={
                message:"Account Created Successfully",
                position:"tc",
                delay:2000,
                autoClose:true,
                type:"success"
            };
            $.afui.toast(opts);
        }else{
            
            var opts={
                message:"Some errors occured !",
                position:"tc",
                delay:2000,
                autoClose:true,
                type:"error"
            };
            $.afui.toast(opts);
        }
    }); 

}






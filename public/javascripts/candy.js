$(function(){
	
	var socket = io.connect(document.URL);
	
	socket.on("back-message",function(message){
		console.log("back message: "+message);
		var chat = $("#chat-area")
		chat.scrollTop(chat[0].scrollHeight);
		chat.append("<p id='text-message-person'>"+message.nome+": "+message.value+"</p>");
	});
	
	$("#chat-inserts").submit(function(event){
		var text = $("#chat-type-area").val();
		$("#chat-type-area").val("");
		var message = {
			"nome":"you",
			"value":text
		}
		var chat = $("#chat-area")
		chat.scrollTop(chat[0].scrollHeight);
		chat.append("<p id='text-message-you'>"+message.nome+": "+message.value+"</p>");
		socket.emit("send-message",message);
		return event.defaultPrevented || event.returnValue == false;
	});	
	
	
	$("#form-identification").submit(function(event){
		var name = $("#user-name").val();
		console.log(name);
		if(name!==""){
			$("#div-identification").hide(1000);
			$("#div-chat").show(1000);
			socket.emit("send-name",name);
		}
		return event.defaultPrevented || event.returnValue == false;
	});	
});
$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
          `<div class="chat-main__Message-messages" data-message-id=${message.id}>
            <div class="chat-main__Message-messages-info">
              <div class="chat-main__Message-messages-info-name">
                ${message.user_name}
              </div>
              <div class="chat-main__Message-messages-info-date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__Message-messages-TextBox">
              <p class="chat-main__Message-messages-TextBox-text">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>`
      return html;
    } else {
      let html = 
          `<div class="chat-main__Message-messages" data-message-id=${message.id}>
            <div class="chat-main__Message-messages-info">
              <div class="chat-main__Message-messages-info-name">
                ${message.user_name}
              </div>
              <div class="chat-main__Message-messages-info-date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__Message-messages-TextBox">
              <p class="chat-main__Message-messages-TextBox-text">
                ${message.content}
              </p>
            </div>
          </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat-main__Message-messages:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__Message').append(insertHTML);
        $('.chat-main__Message').animate({ scrollTop: $('.chat-main__Message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
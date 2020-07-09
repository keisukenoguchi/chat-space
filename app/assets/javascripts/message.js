$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
          `<div class="chat-main__Message-messages">
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
          `<div class="chat-main__Message-messages">
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

  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__Message').append(html)
      $('.Form')[0].reset();
      $('.chat-main__Message').animate({ scrollTop: $('.chat-main__Message')[0].scrollHeight})
      $('.chat-main__Footer-form-send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
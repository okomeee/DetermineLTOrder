$(function(){

  var el;
  var members = [];
  var smembers = [];

  function getNowYMD(){
    var weekDay = ["日", "月", "火", "水", "木", "金", "土"];
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var wd = weekDay[dt.getDay()];
    var result = "今日の日付: " + y + "/" + m + "/" + d + " (" + wd + ")";
    return result;
  }

  // add date
  $('p.today').text(getNowYMD);

  $("#add").on("click", function(e) {
    var name = $("input.name-form").val();
    if (name != "" && members.indexOf(name) == -1) {
      $("div.list ul").append('\
      <span><li class="list-group-item list-group-item-action font-weight-bold h5">' + name + '</li></span>\
      ');
      $("div.alert-success").removeClass("d-none");
      $("div.alert-warning").addClass("d-none");
      members.push(name);
    } else {
      $("div.alert-success").addClass("d-none");
      $("div.alert-warning").removeClass("d-none");
    }
    $("input.name-form").val("");

    if (members.length > 0) {
      $("div.no-member").addClass("d-none");
      $("div.list").removeClass("d-none");
      $("div.result-btn").removeClass("d-none");
    } else {
      $("div.no-member").removeClass("d-none");
      $("div.list").addClass("d-none");
      $("div.result-btn").addClass("d-none");
    }
  });

  $("div.close").on("click", function(e){
    $(e.currentTarget).parent().addClass("d-none");
  });

  // add remove evet
  $(document).on("click", "div.list li", function (e) {
    $("#deleteModal").modal("show");
    el = $(e.target);
  });

  $("#delete").on("click", function(e){
    $("#deleteModal").modal("hide");
    el.parent().remove();
    var idx = members.findIndex(i => i === el.text());
    members.splice(idx, 1);
    if (members.length > 0) {
      $("div.no-member").addClass("d-none");
      $("div.list").removeClass("d-none");
      $("div.result-btn").removeClass("d-none");
    } else {
      $("div.no-member").removeClass("d-none");
      $("div.list").addClass("d-none");
      $("div.result-btn").addClass("d-none");
    }
    $("div.alert-success").addClass("d-none");
    $("div.alert-warning").addClass("d-none");
  });

  $("div.result-btn").on("click", function(e){
    $("div.result").addClass("d-none");
    $("div.result ul").empty();
    $(this).addClass("d-none");
    $("div.load-btn").removeClass("d-none");
    setTimeout(function(){
      for (var i = members.length - 1; i >= 0; i--){
        // 0~iのランダムな数値を取得
        var rand = Math.floor( Math.random() * ( i + 1 ) );
        // 配列の数値を入れ替える
        [members[i], members[rand]] = [members[rand], members[i]];
      }

      for (var i = members.length - 1; i >= 0; i--){
        $("div.result ul").append('\
        <span><li class="list-group-item list-group-item-action font-weight-bold h5">' + members[i] + '</li></span>\
        ');
      }

      $("div.result-btn").removeClass("d-none");
      $("div.load-btn").addClass("d-none");

      $("div.result").removeClass("d-none");
    }, 3000);
  });

});
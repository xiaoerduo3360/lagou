const homeTpl = require("./views/home.html");
const positionTpl = require("./views/position.html");
const positionAddTpl = require("./views/position.add.html");
const positionUpdateTpl = require("./views/position.update.html");
// console.log(homeTpl);
// console.log(positionTpl)

$(".content").html(homeTpl)

$(".sidebar-menu li[link]").on("click",function(){
    switch ($(this).attr("link")) {
        case "home.html":
            $(".content").html(homeTpl)
            break;
        case "position.html":
          positionTable()
    }
});

//点击左侧菜单栏实现对应content的界面显示
// $(".sidebar-menu li[link]").on("click",function(){
//     let map = new Map();
//     map.set("home.html",homeTpl);
//     map.set("position.html",positionTpl);
//     $(".content").html(map.get($(this).attr("link")));
// });


//点击职位添加按钮，显示position.add.html页面
//思考？后续添加元素想要动态获取事件，应该采用事件委托的方式
$('.content').on("click","#addbtn",function(){
    $(".content").html(positionAddTpl);
});


//点击提交按钮实现提交效果
$(".content").on("click","#possubmit",function(){
    let from = $(this).attr('from')
    let url = from === 'add' ? '/api/position/add' : '/api/position/update'
    let data = $("#possave").serialize();
    $.ajax({
        url:url,
        type:"post",
        dataType: 'json',
        data,  
        success(result){
            console.log(result);
            if(result.ret){//说明插入成功
              positionTable()
            }else{
                alert("数据插入失败！！");
            }
        }
    });
})

//点击返回按钮
$(".content").on("click","#posback",function(){
  positionTable()
})

//点击修改
$('.content').on('click', '.pos-edit', function() {
  let posId = $(this).attr('posid')
  $.ajax({
    url: '/api/position/' + posId,
    dataType: 'json',
    success(result) {
      let html = template.render(positionUpdateTpl, {
        data: result.data,
      })
      $('.content').html(html)
    }
  })
  // $(".content").html(positionUpdateTpl)
})

//点击删除
$('.content').on('click', '.pos-remove', function() {
  let posId = $(this).attr('posid')
  console.log(posId)
  $.ajax({
    url: '/api/position/remove',
    type: 'delete',
    data: {
      id: posId,
    },
    success(result){
      if(result) {
        positionTable()
      } else {
        alert('删除失败')
      }
    }
  })
})

// 搜索
$('.content').on('click', '#possearch', function() {
  let keywords = $("input[name='pos_search']").val()
  $.ajax({
    url: '/api/position/query',
    type: 'post',
    data: {keywords},
    success(result) {
      if(result.ret){
        let html = template.render(positionTpl, {
          data: result.data
        })
        $('.content').html(html)
      }else {
        alert('搜索失败了')
      }
    }
  })
})

function positionTable() {
  $(".content").html('')
  // 发送/api/position/find
  $.ajax({
    url: '/api/position/find',
    type:"get",
    dataType: 'json',
    success(result) {
      // let liList = result.data.map((value, index) => {
      //   console.log(value)
      //   return `
      //   <tr>
      //     <td>${index+1}</td>
      //     <td><img width="50" height="50" src="https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg" alt=""></td>
      //     <td>${value.companyName}</td>
      //     <td>${value.positionName}</td>
      //     <td>${value.city}</td>
      //     <td>${value.createTime}</td>
      //     <td>${value.salary}</td>
      //     <td>
      //       <button class="btn btn-sm btn-primary pos-edit" posid="${value._id}"><span class="fa fa-edit"></span> 修改</button>
      //       <button class="btn btn-sm btn-danger pos-remove" posid="${value._id}" filename="${value.companyLogo}"><span class="fa fa-remove"></span> 删除</button>
      //     </td>
      //   </tr>
      //   `
      // })
      // $('#table_first_tr').after(liList)
      let html = template.render(positionTpl, {
        data: result.data
      })
      $('.content').html(html)
    }
  })
}
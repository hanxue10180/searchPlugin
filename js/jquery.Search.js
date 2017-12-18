(function($){
	$.fn.mySearch=function(prop){
        //默认属性值
		var defaultOptions={
			color:"#000", //默认背景色黑色
			fix:true,  //默认固定在页面顶部
			placeholder:"chax" ,//默认搜索框的placeholder值
			//可定义一级页面是否有标题，标题内容以及标题字体颜色
			title:{
			   'show':true,
			   'content':'大众点评',
			   'titleColor':'#f8cfa5'
			},
			//二级搜索栏的字体颜色
			twoPageFontColor:'red',
			//二级搜索页提示内容标题
			RecommendContent:'大家都在搜'
		}
        //用户自定义属性覆盖默认属性
		var options=$.extend({},defaultOptions, prop);
		//生成两层面板内部html
		production(this,options);
		//css渲染函数
		cssFun(options);
		//所有事件列表函数
		eventFun(options);
	};
    //生成代码函数
    function production(el,options){
    	//生成基本的两层div
    	el.html('<div class="A10180SearchPlus1" style="width:100%"></div><div class="A10180SearchPlus2" style="width:100%"></div>');
    	//生成第一层面板内容
        $(".A10180SearchPlus1").html('<div class="title">大众点评</div><div class="searchDiv1"><input type="text" id="search1"/></div>');
    	//生成第二层面板内容
    	$('.A10180SearchPlus2').html('<div class="searchDiv2"> <span class="back" id="back">〈</span> <input type="text" id="search2"/> <span class="searchBtn"id="searchBtn">搜索</span></div><div class="allRecommend"><h5>大家都在搜</h5><ul class="RecommendList"></ul></div><div class="searchResult"><ul class="searchList" id="searchList"></ul></div>').css('display','none');
    	//设置搜索框的placeholder内容
    	$("#search1").attr('placeholder',options.placeholder);
    	$("#search2").attr('placeholder',options.placeholder);
    	//推荐内容列表RecommendList内容生成
		var chooseDataHtml='';
		for(var i=0;i<options.getChooseData().length;i++){
			var context='<li><span class="name">'+options.getChooseData()[i].name+'</span><span class="desc">'+options.getChooseData()[i].desc+'</span></li>';
			chooseDataHtml+=context;
		}
		$('.A10180SearchPlus2 .RecommendList').html(chooseDataHtml);
		//推荐内容标题
		$('.A10180SearchPlus2 .allRecommend h5').html(options.RecommendContent);
    }
    //css渲染函数
    function cssFun(options){
    	//设置面板一的背景色，默认黑色
    	$('.A10180SearchPlus1').css('backgroundColor',options.color);
    	//设置面板一的位置是否为固定在顶部
    	(options.fix)? $('.A10180SearchPlus1').css('position','fixed') : $('.A10180SearchPlus1').css('position','absolute');
    	//设置面板一的标题
    	if(options.title.show==false){
    		$('.A10180SearchPlus1 .title').css('display','none');
    	}else{
    		$('.A10180SearchPlus1 .title').html(options.title.content).css('color',options.title.titleColor);
    	}
    	//设置面板二搜索栏的字体颜色
    	$('.A10180SearchPlus2 .back').css('color',options.twoPageFontColor);
    	$('.A10180SearchPlus2 .searchBtn').css('color',options.twoPageFontColor);
    	
    }
    //所有事件列表函数
    function eventFun(options){
    	//面板一点击事件
    	$('#search1').click(function(){
    		$(".A10180SearchPlus1").css('display','none');
    		$('.A10180SearchPlus2').css('display','block');
    		$('.A10180SearchPlus2 #search2').focus();
    		$('.A10180SearchPlus2 .allRecommend').css('display','block');
			$('.A10180SearchPlus2 .searchResult').css('display','none');
    	})
    	//back按钮点击事件
    	$('#back').click(function(){
    		$(".A10180SearchPlus1").css('display','block');
    		$('.A10180SearchPlus2').css('display','none');
    		$(".A10180SearchPlus2 #addressList").html('');
    		$(".A10180SearchPlus2 #search2").val('');
    	})
        //搜索按钮事件
		$(".A10180SearchPlus2 #searchBtn").click(function(){
			options.onSearchBtn();
		});
        //面板二搜索框input事件
		$(".A10180SearchPlus2 #search2").bind('input', function() {
			var oHtml='';
			if($(this).val()!=''){
				for(var i=0;i<options.onSearch($(this).val()).length;i++){
				   var context='<li><span class="name">'+options.onSearch($(this).val())[i].name+'</span><span class="desc">'+options.onSearch($(this).val())[i].desc+'</span></li>';
				   oHtml+=context;
			    }
			}
			$('.A10180SearchPlus2 .searchList').html(oHtml);
			$('.A10180SearchPlus2 .allRecommend').css('display','none');
			$('.A10180SearchPlus2 .searchResult').css('display','block');
		});
		//搜索列表点击事件 
        $('.A10180SearchPlus2 .searchList').on('click','li',function(){
			options.onAction($(this));
		});
		//推荐列表事件
		$('.A10180SearchPlus2 .RecommendList').on('click','li',function(){
			options.onAction($(this));
		})
    }
})(jQuery)

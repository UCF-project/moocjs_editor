VISH.Dummies = (function(VISH,undefined){
	//variable to add to the id when replacing id_to_change in the dummy
	var nextDivId = 1;
	var nextArticleId = 1;
	var hashTypeQuiz = {"open":0,  "multiplechoice" : 1, "truefalse": 2 };
	//array with the articles (slides) definition, one for each template
	//the ids of each div are id='id_to_change' and will be replaced by the next id by the function _replaceIds(string)
	var dummies = [];
	var quizDummies = [];

	var init = function(){
		dummies = [
		"<article id='article_id_to_change' template='t1' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='left' 	 size='large' class='t1_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='header' size='small' class='t1_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='subheader' size='extra-small' class='t1_subheader editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t2' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='left' 	 size='large' class='t2_left editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t3' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t3_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='large'  class='t3_left editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t4' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t4_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='large'  class='t4_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='right'  size='small'  class='t4_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t5' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t5_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='medium' class='t5_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='right'  size='medium' class='t5_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t6' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t6_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='medium' class='t6_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='center' size='medium' class='t6_center editable grey_background selectable'></div><div id='div_id_to_change' areaid='right' size='medium'    class='t6_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t7' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t7_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='medium' class='t7_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='center' size='large'  class='t7_center editable grey_background selectable'></div><div id='div_id_to_change' areaid='subheader' size='small' class='t7_subheader editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t8' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t8_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='small'  class='t8_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='center' size='large'  class='t8_center editable grey_background selectable'></div><div id='div_id_to_change' areaid='right' size='small'     class='t8_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t9' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t9_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='medium' class='t9_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='center' size='medium' class='t9_center editable grey_background selectable'></div><div id='div_id_to_change' areaid='right' size='medium'    class='t9_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t10' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='center'  size='large' class='t10_center editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t11' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='center1' size='medium' class='t11_center1 editable grey_background selectable'></div><div id='div_id_to_change' areaid='center2' size='medium'  class='t11_center2 editable grey_background selectable'></div><div id='div_id_to_change' areaid='center3'  size='medium'  class='t11_center3 editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t12' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='left1'   size='medium' class='t12_left1 editable grey_background selectable'></div><div id='div_id_to_change' areaid='right1' size='medium' class='t12_right1 editable grey_background selectable'></div><div id='div_id_to_change' areaid='left2' size='medium' class='t12_left2 editable grey_background selectable'></div><div id='div_id_to_change' areaid='right2' size='medium'  class='t12_right2 editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t13' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='header'  size='small' class='t13_header editable grey_background selectable'></div><div id='div_id_to_change' areaid='circle' size='medium' class='t13_circle editable grey_background selectable'></div><div id='div_id_to_change' areaid='left' size='medium' class='t13_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='right' size='medium'  class='t13_right editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t14' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='circle1' size='small' class='t14_circle1 editable grey_background selectable'></div><div id='div_id_to_change' areaid='right1' size='medium' class='t14_right1 editable grey_background selectable'></div><div id='div_id_to_change' areaid='circle2' size='small' class='t14_circle2 editable grey_background selectable'></div><div id='div_id_to_change' areaid='right2' size='medium' class='t14_right2 editable grey_background selectable'></div><div id='div_id_to_change' areaid='circle3' size='small' class='t14_circle3 editable grey_background selectable'></div><div id='div_id_to_change' areaid='right3' size='medium' class='t14_right3 editable grey_background selectable'></div></article>",
		"<article id='article_id_to_change' template='t15' slidenumber='slidenumber_to_change'><div class='delete_slide'></div><img class='help_in_template' id='help_template_image' src='"+VISH.ImagesPath+"helptutorial_circle_blank.png'/><div id='div_id_to_change' 	areaid='left' 	 size='medium' class='t15_left editable grey_background selectable'></div><div id='div_id_to_change' areaid='center' size='medium' class='t15_center editable grey_background selectable'></div><div id='div_id_to_change' areaid='right' size='medium' class='t15_right editable grey_background selectable'></div><div id='div_id_to_change' areaid='center2' size='large' class='t15_center2 editable grey_background selectable'></div></article>"
		];

		quizDummies = ["<div class='openQuizContainer'><textarea class='value_open_question_in_zone'><div><font size="+4+">Write question here</font></div></textarea></div>", 
		"<div class='multipleChoiceQuizContainer'><div class='value_multiplechoice_question_in_zone'><div class='initTextDiv'><font size='4'>Write question here</font></div></div><ul class='ul_mch_options_in_zone'><li class='li_mch_options_in_zone'><span>a)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li><li class='li_mch_options_in_zone'><span>b)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li><li class='li_mch_options_in_zone'><span>c)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li><li class='li_mch_options_in_zone'><span>d)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li><li class='li_mch_options_in_zone'><span>e)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li><li class='li_mch_options_in_zone'><span>f)</span><div class='multiplechoice_option_in_zone'><div class='initTextDiv'><font size='4'>Write options here</font></div></div></li></ul><input type='hidden' name='quiz_id'/></div></div>",
		"<div class='trueFalseQuizContainer'><p> quiz dummy truefalse</p></div>"
		];
	}

	/**
	 * function to get the string for the new slide
	 * param article_id: id of the article, used for editing presentations
	 */
	var getDummy = function(template, position, presentation_id, existing_slide){
			var dum = dummies[parseInt(template,10)-1];
			return _replaceIds(dum, position, presentation_id, existing_slide);
	};

	var getQuizDummy = function(type_quiz, position) {

		return quizDummies[hashTypeQuiz[type_quiz]];

	}
	
	/**
	 * Function to replace the text id_to_change by the next id
	 * the added id will be "zone + nextId"
	 * CAREFUL: if article_id is passed we remove "editable" class because we are editing an existing presentation
	 */
	var _replaceIds = function(string, position, presentation_id, existing_slide){
		var newString = string;
		// VISH.Debugging.log("article_id passed like parameter is: " + article_id);
		while(newString.indexOf("div_id_to_change") != -1){
			newString = newString.replace("div_id_to_change", "zone" + nextDivId);
			nextDivId++;
		}
		while(newString.indexOf("article_id_to_change") != -1){			
				if(!presentation_id){
					presentation_id = "";
				}
				newString = newString.replace("article_id_to_change", "article_" + presentation_id + "_" + position);				
		}
		while(newString.indexOf("slidenumber_to_change") != -1){	
				newString = newString.replace("slidenumber_to_change", position);
		}
		if(existing_slide){
			newString = newString.replace(/editable /g,"");
		}
		return newString;
	};
	
	
	return {
		init			: init,
		getDummy		: getDummy, 
		getQuizDummy	: getQuizDummy

	};

}) (VISH);
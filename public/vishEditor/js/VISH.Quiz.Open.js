VISH.Quiz.Open = (function(V,$,undefined){

	var init = function(){
		_loadEvents();
	};

	var _loadEvents = function(){
	};

	/* Render the quiz in the DOM */
	var render = function(quizJSON,template){
		var quizId = quizJSON.quizId;
		var container = $("<div id='"+quizId+"' class='quizContainer openQContainer' type='"+V.Constant.QZ_TYPE.OPEN+"'></div>");

		//Question
		var questionWrapper = $("<div class='mc_question_wrapper, mc_question_wrapper_viewer'></div>");
		$(questionWrapper).html(quizJSON.question.wysiwygValue);
		$(container).append(questionWrapper);

		//Answer TextArea
		var answerTextArea = $("<textarea class='openQTextArea'></textarea>");
		$(container).append(answerTextArea);

		var quizButtons = V.Quiz.renderButtons(quizJSON);
		$(container).append(quizButtons);

		return V.Utils.getOuterHTML(container);
	};


	/* 
	* Methods used for Self-assesment 
	*/

	/* Update UI after answer */
	var onAnswerQuiz = function(quiz,options){
		var afterAnswerAction = ((typeof options.afterAnswerAction != "undefined")&&(typeof options.afterAnswerAction == "string")) ? options.afterAnswerAction : "disabled";
		var canRetry = ((typeof options.canRetry != "undefined")&&(typeof options.canRetry == "boolean")) ? options.canRetry : false;
		var willRetry = false;

		var quizJSON = V.Quiz.getQuiz($(quiz).attr("id"));
		var textArea = $(quiz).find("textarea.openQTextArea");

		if(quizJSON.selfA){
			var quizAnswer = V.Utils.purgeString(quizJSON.answer.value);
			var userAnswer = V.Utils.purgeString($(textArea).val());

			var sA = userAnswer.toLowerCase().replace(/\s{2,}/g,' ');
			var sB = quizAnswer.toLowerCase().replace(/\s{2,}/g,' ');
			var levenshteinDistance = V.Utils.getLevenshteinDistance(sA,sB);

			var answeredQuizCorrectly = false;

			//Color answer
			if(levenshteinDistance===0){
				$(textArea).addClass("openQ_correct_answer");
				answeredQuizCorrectly = true;
			} else {
				//Color Wrong answer
				$(textArea).addClass("openQ_wrong_answer");
				answeredQuizWrong = true;
			}

			willRetry = (canRetry)&&(answeredQuizCorrectly===false);

		} else {
			//Answering a non self-assesment open-ended quiz.
			willRetry = false;
		}

		if(willRetry){
			//Retry
			_disableQuiz(quiz);
			V.Quiz.retryAnswerButton(quiz);
		} else {
			//Show quiz response in TextArea
			var rawUserAnswer = $(textArea).val();
			$(textArea).val($(textArea).val() + "\n\n" + V.I18n.getTrans("i.Response") + ":" + "\n" + V.Utils.purgeString(quizJSON.answer.value));

			switch(afterAnswerAction){
				case "continue":
					V.Quiz.continueAnswerButton(quiz);
					break;
				case "disabled":
				default:
					disableQuiz(quiz);
					break;
			};
		}
	};

	/* Reset UI to make possible to answer again the quiz */
	var onRetryQuiz = function(quizDOM){
		var textArea = $(quizDOM).find("textarea.openQTextArea");
		$(textArea).removeClass("openQ_correct_answer");
		$(textArea).removeClass("openQ_wrong_answer");
		_enableQuiz(quizDOM);
		V.Quiz.enableAnswerButton(quizDOM);
	};

	/* 
	* Methods used for Real Time Quizzes 
	*/

	var getReport = function(quiz){
		var report = {};
		report.answers = [];

		// TODO
		// $(quiz).find("tr.mc_option").each(function(index,tr){
		// 	var radioBox = $(tr).find("input[name='mc_option']");
		// 	if($(radioBox).is(':checked')){
		// 		var choiceId = $(tr).attr("choiceid");
		// 		report.answers.push({choiceId: V.Quiz.getQuizChoiceOriginalId(choiceId).toString(), answer: "true"});
		// 	}
		// });

		report.empty = (report.answers.length===0);
		return report;
	};

	var disableQuiz = function(quiz){
		_disableQuiz(quiz);
		V.Quiz.disableAnswerButton(quiz);
	};

	var _disableQuiz = function(quiz){
		var textArea = $(quiz).find("textarea.openQTextArea");
		$(textArea).attr("readonly","readonly");
	};

	var _enableQuiz = function(quiz){
		var textArea = $(quiz).find("textarea.openQTextArea");
		$(textArea).removeAttr("readonly");
		$(textArea).text("");
	};

	return {
		init                : init,
		render              : render,
		onAnswerQuiz        : onAnswerQuiz,
		onRetryQuiz			: onRetryQuiz,
		getReport           : getReport,
		disableQuiz         : disableQuiz
	};
	
}) (VISH, jQuery);
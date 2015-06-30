CalEvents = new Meteor.Collection('calevents')
Session.setDefault('editing_calevent', null)
Session.setDefault('showEditEvent', false)


Router.route('/', function () {
  this.render('home');
});
Template.calendar.rendered = function(){
  $('#calendar').fullCalendar({
    dayClick:function( date, allDay, jsEvent, view) {

    },
    eventClick: function(callEvent, jsEvent, view){

    },
    events: function(start, end, callback) {
      var events = []
      valEvents.forEach(function(evt){
        events.push({
          id:evt._id,
          title:evt.title,
          start:evt.start,
          end:evt.end
        })
      })
      callback(events)
    }
  })
}

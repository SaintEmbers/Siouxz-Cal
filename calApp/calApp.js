CalEvent = new Mongo.Collection('calevent');
// Photo = new MongoCollection('photo')

if(Meteor.isClient){

  Template.main.helpers({
    editing_event: function(){
      return Session.get('editing_event')
    },
    adding_media: function(){
      return Session.get('adding_media')
    }
  })
Template.main.events({

});

  Template.main.rendered = function(){
    var calendar = $('#calendar').fullCalendar({
      dayClick:function(date, allDay, jsEvent, view){
        // console.log('view:',view)
        var calendarEvent = {};
        calendarEvent.start = date;
        calendarEvent.end = date;
        calendarEvent.title = 'New Event';
        // calendarEvent.media = null;
        calendarEvent.tagline = '';
        calendarEvent.owner = Meteor.userId();
        Meteor.call('saveCalEvent',calendarEvent);
        console.log(calendarEvent)

      },
      eventClick: function(calEvent, jsEvent, view){
        Session.set('editing_event', calEvent._id)
      },
      eventDrop:function(reqEvent){
        Meteor.call('moveEvent', reqEvent)
      },
      events: function(start, end, callback){
        var calEvents = CalEvent.find({}, {reactive:false}).fetch()
        callback(calEvents)
      },
      // eventBackgroundColor: #00FFFF,
      editable: true,
      selectable: true
    }).data().fullCalendar
    Deps.autorun(function(){
      CalEvent.find().fetch();
      if(calendar){
        calendar.refetchEvents();
      }
    })
  }
}





package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.*;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import com.spajalice.ProjektSpajalice.auth.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

    public List<Event> allEvents(){
        return eventRepository.findAll();
    }

    public Optional<Event> singleEventId(Long id){
        return eventRepository.findBy_id(id);
    }

    public Optional<List<Event>> eventsNext24Hours(){
        Date currentDate =new Date();
        Date next24Hours = new Date(currentDate.getTime()+(24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next24Hours);
    }

    public Optional<List<Event>> eventsNext7Days(){
        Date currentDate =new Date();
        Date next7Days = new Date(currentDate.getTime()+(7*24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next7Days);
    }

    public Optional<List<Event>> eventsNext30days(){
        Date currentDate =new Date();
        Date next30Days = new Date(currentDate.getTime()+(30L *24*60*60*1000));
        return eventRepository.findByEventDateBetween(currentDate,next30Days);
    }

    public long eventCount(){
        return eventRepository.count();
    }
    
    public Event addEvent(Event event){
        List<Event> events = eventRepository.findAllBy(new Object());
        Optional<Long> maxId = events.stream().map(Event::get_id).max(Long::compareTo);
        event.set_id(maxId.orElse(0L) + 1);
        return eventRepository.save(event);
    }

    public Event editEvent(Event event){
        return eventRepository.save(event);
    }

    /**
     * Deletes an event and its associated reviews.
     *
     * @param eventId The ID of the event to be deleted.
     */
    public void deleteEventAndReviews(Long eventId) {
        // Retrieve the event by its ID
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        // Check if the event exists
        if (optionalEvent.isPresent()) {
            // Get the event from the optional
            Event event = optionalEvent.get();

            // Delete the event itself
            eventRepository.deleteById(eventId);
        }
    }

    public List<User> sendEmailToIntrested(EventType type, PlaceSimple placeSimple, String eventName){
        try{
            List<User> typeReturn = userRepository.findByintrestedInTypesContaining(type);
            List<User> placeSimpleReturn = userRepository.findByintrestedInPlaceContaining(placeSimple);

            Set<User> uniqueUsers = new HashSet<>();
            uniqueUsers.addAll(typeReturn);
            uniqueUsers.addAll(placeSimpleReturn);
            List<User> allForEmail = new ArrayList<>(uniqueUsers);

            for(User u : allForEmail){

                emailSender.sendInterest(u.getEmail(), buildEmail(u.getFirstName(), "https://spring-render-front-final.onrender.com", eventName));
            }
            return  placeSimpleReturn;
        } catch (Exception e){
            return Collections.emptyList();
        }
    }

    private String buildEmail(String name, String link, String eventName) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">New in events</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> New event: (\")" + eventName + "(\") that fits your interest has just been created. Click on the link below to check the newest events: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Check out what is new</a> </p></blockquote>. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}

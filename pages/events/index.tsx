import EventHeader from "@/components/events/EventHeader";
import ListEvents from "@/components/events/ListEvents";

export default function Events() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-40" />
      <EventHeader />
      <div className="h-20" />
      <ListEvents />
    </div>
  );
}

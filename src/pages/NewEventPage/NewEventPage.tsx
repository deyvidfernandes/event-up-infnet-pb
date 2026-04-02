import NewEventForm, {
  EventFormData,
} from "@/components/features/NewEventForm/NewEventForm";
import styles from "./NewEventPage.module.css";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import { addEvent, getLoggedUser } from "@/lib/util/mockLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { EventData } from "@/types/event";

export default function NewEventPage() {
  const onSubmitEvent = (data: EventFormData) => {
    const username = getLoggedUser()!.email;
    const dados_tratados: EventData = {
      ...data,
      id: uuidv4(),
    };

    addEvent(username, dados_tratados);
  };

  return (
    <>
      <PageHeader content="Novo evento" />
      <div className={styles.pageContentContainer}>
        <NewEventForm onSubmit={onSubmitEvent}></NewEventForm>
      </div>
    </>
  );
}

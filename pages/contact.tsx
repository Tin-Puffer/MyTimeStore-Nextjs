import { HeaderContact, ContactContent } from "../components/ContactComponent";

export default function Contact() {
  return (
    <div>
      <HeaderContact></HeaderContact>
      <ContactContent></ContactContent>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {},
  };
}

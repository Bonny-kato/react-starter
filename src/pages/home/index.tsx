import LocalStorage from "@bonny-kato/localstorage";


    const storage = new LocalStorage("test");
const HomePage = () => {
    // localStorage.setValue("name", {name:"bonn-kato"})
    storage.removeValues("name")


    return (
        <section>
            home page
        </section>
    );
};
export default HomePage;

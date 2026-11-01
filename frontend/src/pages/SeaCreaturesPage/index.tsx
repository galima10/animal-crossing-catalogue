import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";
import NavArrowButtons from "@/components/molecules/NavArrowButtons";

export default function SeaCreaturesPage(){
    return (
        <main>
            <ItemsList path={API_PATH.seaCreature} />
            <NavArrowButtons />
        </main>
    );
};

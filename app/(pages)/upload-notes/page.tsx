import UploadNotesPage from "@/components/UploadNotesPage";
import ProtectedPage from "@/components/ProtectedPage";

export default function Page() {
  return (
    <ProtectedPage>
      <UploadNotesPage />
    </ProtectedPage>
  );
}

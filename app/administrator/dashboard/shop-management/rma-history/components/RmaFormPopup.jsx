import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function RepairManagementFormPopup() {
  const [signature, setSignature] = useState("");

  const handleCancel = () => {
    setSignature("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full p-8 md:p-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Confirm Repair <span className="text-blue-600">management form</span>
        </h1>

        {/* Terms Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Terms and conditions</h2>

          {/* Greek Text */}
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            Όροι: Υπογράφοντας αυτή τη φόρμα εξουσιοδοτώ το κατάστημα RAMSPEED
            και τους τεχνικούς του να πραγματοποιήσουν επισκευή στην συσκευή
            μου. Συμφωνώ πως η συσκευή μου στάλθηκε με κάποιο πρόβλημα και
            υπάρχει περίπτωση να δημιουργηθεί περεταίρω βλάβη στο μέλλον λόγω
            αυτού του προβλήματος. Δεν επιρρίπτω ευθύνη στο κατάστημα RAMSPEED
            για οποιαδήποτε άλλη βλάβη μπορεί να προκληθεί στη συσκευή μου στο
            μέλλον μετά. αν αφαίρεσα με κάποιο τρόπο το ανταλλακτικά τα οποία
            αντικαταστάθηκαν κατά την διάρκεια της επισκευής που έγινε. Επίσης
            αν παρουσιαστεί μετά την επισκευή κάποιο άλλο πρόβλημα το κατάστημα
            RAMSPEED δεν ευθύνεται για αυτό το πρόβλημα. Σε ουδεμία περίσταση
            δεν θα ευθύνεται το κατάστημα RAMSPEED για οιαδήποτε βλάβη στη
            συσκευή που στάλθηκε για επισκευή η απώλεια δεδομένων, απώλεια
            κερδών ή συμπτωματικοί ζημιά που μπορεί να ακυρώσει την εγγύηση της
            συσκευής σε περίπτωση που αυτή έχει ακυρωθεί από την κατασκευάστρια
            εταιρεία. Επίσης σε περίπτωση που η συσκευή μου δεν επιδιορθωθεί θα
            πληρώσω €20.00 για την διάγνωσή του τεχνικού. Τέλος, τα εξαρτήματα
            δεν έχουν εγγύηση.
          </p>

          {/* English Text */}
          <p className="text-sm text-gray-700 leading-relaxed">
            Terms: By signing this form, I authorize RAMSPEED and its
            technicians to repair my device. I agree that my device has been
            shipped with a problem and that there may be further damage in the
            future due to this problem. I do not blame RAMSPEED for any other
            damage that may be caused to my device in the future unless you row
            it to any of the spare parts that have been replaced during the
            repair. Also if another problem occurs after the repair, RAMSPEED is
            not responsible for this problem. Under no circumstances will I be
            liable to RAMSPEED for any damage to the device sent for repair or
            loss of data, loss of profits or incidental damage that may
            invalidate the warranty of the device if it has been canceled by the
            manufacturer. Also, if my device not fix, I will pay € 20.00 for the
            diagnosis of the technician. Finally, the parts aren't having
            warranty.
          </p>
        </div>

        {/* Signature Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Signature box</h2>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Put signature here"
            className="w-full h-32 border-2 border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          {/* <button onClick={handleCancel}>Cancel</button> */}

          <AlertDialogCancel className="px-8 py-3 bg-[#d0d5dd] hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors duration-200 order-2 sm:order-1 ">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handlePrint}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 order-1 sm:order-2"
          >
            Print ticket
          </AlertDialogAction>
        </div>
      </div>
    </div>
  );
}

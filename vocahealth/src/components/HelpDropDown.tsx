import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Hilfe">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4 space-y-2 text-sm">
        <div className="font-semibold text-gray-800 text-center w-full">📘 Hilfe & Anleitungen</div>

        <div className="flex items-start gap-2">
          <span>📅</span>
          <p>Um <strong>Termine anzusehen</strong>, klicke auf ein Datum im Kalender.</p>
        </div>

        <div className="flex items-start gap-2">
          <span>➕</span>
          <p>Um <strong>einen Termin hinzuzufügen</strong>, wähle ein Datum und klicke auf das <strong>+</strong>-Symbol.</p>
        </div>

        <div className="flex items-start gap-2">
          <span>✏️</span>
          <p>Um <strong>einen Termin zu bearbeiten</strong>, klicke auf das Bleistift-Symbol beim gewählten Datum.</p>
        </div>

        <div className="flex items-start gap-2">
          <span>🗑️</span>
          <p>Um <strong>einen Termin zu löschen</strong>, klicke auf das Papierkorb-Symbol beim gewählten Datum.</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

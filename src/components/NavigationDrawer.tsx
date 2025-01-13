import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { version } from "../../package.json";

type NavigationDrawerProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onClickNewChat: () => void;
};

function NavigationDrawer({
  isMenuOpen,
  toggleMenu,
  onClickNewChat,
}: NavigationDrawerProps) {
  return (
    <div className="relative z-10">
      <div
        className={`fixed top-0 left-0 h-full bg-secondary transition-transform duration-300 ${
          isMenuOpen ? "transform-none" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}>
        <div className="flex flex-row mt-16 p-4">
          <button
            onClick={onClickNewChat}
            className="text-white bg-secondary p-2 rounded mb-4">
            Novo Chat
          </button>
        </div>
      </div>

      <div
        className={`fixed bottom-12 left-6 flex flex-col items-start transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        } ${isMenuOpen ? "transform-none" : "-translate-x-full"}`}
        style={{ width: "250px" }}>
        <p className="text-lg font-semibold text-center text-gray-300">
          Youtube Ideas
        </p>
        <p className="text-md font-medium text-center text-gray-300">
          Ricardo Castanho
        </p>
        <p className="text-sm text-center text-gray-300 pt-1">
          Version {version}
        </p>
      </div>

      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 p-2 text-white bg-secondary rounded">
        <Icon path={mdiMenu} size={1} />
      </button>
    </div>
  );
}

export default NavigationDrawer;

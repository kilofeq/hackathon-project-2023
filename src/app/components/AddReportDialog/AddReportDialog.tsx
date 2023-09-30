import { Dialog } from '@headlessui/react';

type Props = {
	isModalOpen: boolean
	toggleModalOpen: () => void
}

export function AddReportDialog({
  isModalOpen,
  toggleModalOpen,
}: Props) {
  return (
    <Dialog open={isModalOpen} onClose={toggleModalOpen}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={toggleModalOpen}>Deactivate</button>
        <button onClick={toggleModalOpen}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}

export default AddReportDialog;

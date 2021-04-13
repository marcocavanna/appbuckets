import * as React from 'react';
import prettyBytes from 'pretty-bytes';

import { useInputValue } from '../../hooks/useInputValue';

import Input from '../../Input';

import Item from '../../Item';
import type { ItemGroupProps } from '../../Item';

import { useDropzone } from '../Dropzone.context';
import { DropzoneFile } from '../Dropzone.types';


/* --------
 * Internal Component
 * -------- */
const DropzoneFileItem: React.FunctionComponent<{ file: DropzoneFile }> = (props) => {

  const {
    file
  } = props;


  // ----
  // State and Hook declaration
  // ----
  const [ newItemName, handleItemNameChange ] = useInputValue(file.name);
  const [ isEditing, setIsEditing ] = React.useState(false);
  const dropzone = useDropzone();


  // ----
  // Remove the isEditing state on upload
  // ----
  React.useEffect(
    () => {
      if (dropzone.isUploading) {
        setIsEditing(false);
      }
    },
    [ dropzone.isUploading ]
  );


  // ----
  // Handlers
  // ----
  const handleEditStart = React.useCallback(
    () => {
      setIsEditing(true);
    },
    [ setIsEditing ]
  );

  const handleEditEnd = React.useCallback(
    () => {
      /** Save the new Item name */
      dropzone.editFile({
        ...file,
        name: newItemName.length ? newItemName : file.name
      });

      setIsEditing(false);
    },
    [
      dropzone,
      file,
      newItemName,
      setIsEditing
    ]
  );

  const handleFileRemove = React.useCallback(
    () => {
      dropzone.deleteFile(file);
    },
    [ dropzone, file ]
  );


  // ----
  // Memoized Parts
  // ----
  const itemHeader = React.useMemo(
    () => {
      if (!isEditing) {
        return file.name;
      }

      return (
        <Input
          autoFocus
          selectAllOnClick
          value={newItemName}
          onChange={handleItemNameChange}
          actions={[
            {
              key     : 1,
              disabled: !newItemName,
              icon    : 'check',
              success : true,
              onClick : handleEditEnd
            }
          ]}
        />
      );
    },
    [
      isEditing,
      file.name,
      newItemName,
      handleItemNameChange,
      handleEditEnd
    ]
  );


  // ----
  // Component Render
  // ----
  return (
    <Item
      centered
      loading={file.state.isUploading}
      disabled={dropzone.isUploading || file.state.success}
      primary={file.state.isUploading}
      danger={file.state.error}
      success={file.state.success}
      avatar={{
        icon: file.state.isUploading
          ? 'sync'
          : file.state.error
            ? 'times'
            : file.state.success
              ? 'check'
              : file.icon,
        type: 'square'
      }}
      header={itemHeader}
      content={!isEditing ? prettyBytes(file.size) : undefined}
      tools={[
        dropzone.props.editItemTool && !isEditing && ({
          ...dropzone.props.editItemTool,
          key    : 0,
          onClick: handleEditStart
        }),
        dropzone.props.removeItemTool && ({
          ...dropzone.props.removeItemTool,
          key    : 1,
          onClick: handleFileRemove
        })
      ]}
    />
  );
};


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneFilesProps extends ItemGroupProps {

}


/* --------
 * Component Definition
 * -------- */
const DropzoneFiles: React.FunctionComponent<DropzoneFilesProps> = () => {

  const dropzone = useDropzone();

  if (!dropzone.files.length) {
    return null;
  }

  return (
    <Item.Group relaxed divided>
      {dropzone.files.map((file) => (
        <DropzoneFileItem
          key={file.id}
          file={file}
        />
      ))}
    </Item.Group>
  );
};

DropzoneFiles.displayName = 'DropzoneFiles';

export default DropzoneFiles;

import { ThemeOptions } from './BucketContext.types';


export const defaultBucketThemeConfig: ThemeOptions = {

  // ----
  // Accordions Props
  // ----
  accordions: {
    icon        : 'angle-right',
    iconRotation: 90
  },


  // ----
  // Avatar Component
  // ----
  avatar: {
    type: 'round'
  },


  // ----
  // AutoSpacer Component
  // ----
  autoSpacer: {},


  // ----
  // Backdrop Component
  // ----
  backdrop     : {},
  backdropInner: {},


  // ----
  // Badge Component
  // ----
  badge: {},


  // ----
  // Box Component
  // ----
  box: {},


  // ----
  // Button Component
  // ----
  button     : {
    as          : 'button',
    iconPosition: 'left',
    type        : 'button'
  },
  buttonGroup: {},


  // ----
  // Checkbox Component
  // ----
  checkbox: {},


  // ----
  // Collapsable Component
  // ----
  collapsable: {
    collapsedHeight: 0
  },


  // ----
  // Color Picker Component
  // ----
  colorPicker: {
    pickerType    : 'block',
    showColorValue: true
  },


  // ----
  // Column Component
  // ----
  column: {},


  // ----
  // Container Component
  // ----
  container: {},


  // ----
  // DayPicker Component
  // ----
  dayPicker: {
    closeOnDayPicked: true,
    dateFormat      : 'DD/MM/YYYY',
    showInputMask   : true,
    showOutsideDays : true,
    showWeekNumbers : true,
    type            : 'input'
  },


  // ----
  // Divider Component
  // ----
  divider: {
    textAlign: 'center'
  },


  // ----
  // DropDown Component
  // ----
  dropdownMenu: {
    basic             : false,
    closeOnItemClicked: true,
    inverted          : false,
    openOn            : [ 'click' ],
    position          : 'bottom right'
  },


  // ----
  // Dropzone Component
  // ----
  dropzone: {
    clearButton      : {
      content: 'Clear'
    },
    editItemTool     : {
      icon: 'edit',
      flat: false
    },
    hintOnIdle       : 'Choose or Drag Files',
    hintTitle        : 'File Upload',
    hintWhileDisabled: 'Upload Disabled',
    hintWhileDragging: 'Release file to Upload',
    iconOnDragging   : 'file-download',
    iconOnIdle       : 'cloud-upload-alt',
    maxFiles         : 10,
    multiple         : true,
    on               : [ 'click', 'drop' ],
    removeItemTool   : {
      icon  : 'times-circle',
      danger: true,
      flat  : false
    },
    uploadButton     : {
      content: 'Upload'
    }
  },


  // ----
  // Empty Content Component
  // ----
  emptyContent: {},


  // ----
  // Fade Component
  // ----
  fade: {
    appear       : true,
    timeout      : {
      enter: 300,
      exit : 300
    },
    unMountOnExit: true
  },


  // ----
  // Form Component
  // ----
  form      : {},
  formFormik: {
    formActionWrapper : 'div',
    formContentWrapper: 'div'
  },


  // ----
  // Header Component
  // ----
  header         : {},
  headerContent  : {
    as: 'h3'
  },
  headerSubheader: {
    as: 'h4'
  },


  // ----
  // Hero Button Component
  // ----
  heroButton: {},


  // ----
  // Icon Component
  // ----
  icon: {},


  // ----
  // Input Component
  // ----
  input: {
    textareaProps: {
      minRows: 2,
      maxRows: 8
    },
    type         : 'text'
  },


  // ----
  // Item Component
  // ----
  item       : {},
  itemContent: {},
  itemGroup  : {},
  itemHeader : {},
  itemMeta   : {},
  itemText   : {},
  itemTools  : {},


  // ----
  // Label Component
  // ----
  label     : {},
  labelGroup: {},


  // ----
  // Loader Component
  // ----
  loader: {
    active: true,
    type  : 'circular'
  },


  // ----
  // Menu Component
  // ----
  menu    : {},
  menuItem: {},


  // ----
  // Message Component
  // ----
  message: {},


  // ----
  // Modal Component
  // ----
  modal       : {
    closeIcon           : 'times',
    closeOnBackdropClick: true
  },
  modalActions: {},
  modalContent: {},
  modalHeader : {},


  // ----
  // Numeric Input Component
  // ----
  numericInput: {
    allowNegative    : true,
    thousandSeparator: '.',
    decimalSeparator : ',',
    selectAllOnClick : true
  },


  // ----
  // Panel Component
  // ----
  panel      : {},
  panelBody  : {},
  panelFooter: {},
  panelHeader: {},


  // ----
  // Popup Component
  // ----
  popup: {
    basic            : true,
    inverted         : true,
    hideOnScrollDelay: 50,
    offset           : [ 0, 5 ],
    openOn           : [ 'hover' ],
    position         : 'top center'
  },


  // ----
  // Progress Component
  // ----
  circularProgress: {
    max        : 100,
    min        : 0,
    radius     : 16,
    strokeWidth: 10
  },
  linearProgress  : {
    max: 100,
    min: 0
  },


  // ----
  // Row Component
  // ----
  row: {},


  // ----
  // Rx Table Component
  // ----
  rxTable: {
    filterLogic     : 'and',
    initiallyLoading: true,
    reloadSilently  : true
  },


  // ----
  // Section Component
  // ----
  section: {
    direction: 'vertical'
  },


  // ----
  // Select Component
  // ----
  select     : {},
  selectMulti: {},


  // ----
  // Sticky Component
  // ----
  sticky: {},


  // ----
  // Table Component
  // ----
  table           : { as: 'table' },
  tableBody       : { as: 'tbody' },
  tableCell       : { as: 'td' },
  tableCellContent: { as: 'p', type: 'content' },
  tableFooter     : { as: 'tfoot' },
  tableHeader     : { as: 'thead' },
  tableHeaderCell : { as: 'th' },
  tableRow        : { as: 'tr' },


  // ----
  // Tab Component
  // ----
  tabPanel: {},
  tabs    : {
    layout          : { menuWidth: 4, panelWidth: 20, menuOn: 'left' },
    menu            : { tab: true },
    renderActiveOnly: true
  },


  // ----
  // Toast Component
  // ----
  toast: {},


  // ----
  // Virtualized Table Component
  // ----
  virtualizedTable: {
    filterLogic   : 'and',
    reloadSilently: true
  }

};

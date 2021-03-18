
const styles = theme => ({
  "@global": {
    /**
     * Disable the focus outline, which is default on some browsers like
     * chrome when focusing elements
     */
     ":App": {
      margin: 20,
      padding: 2,
      width: 200,
      height: 800,
      border: '1px solid #ccc',
      borderRadius: 4,
      /* background-color: #19233c; */
      /* color: #fff; */
    },
    list: {
      overflowY: "auto",
      margin: 0,
      padding: 0,
      listStyle: "none",
      height: "100%",
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
  }
})
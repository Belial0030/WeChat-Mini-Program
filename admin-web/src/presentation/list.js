export default {
  contentStyleChange() {
    this.contentPageStyleChange();
  },
  contentPageStyleChange() {
    const parts = [];
    if (this.contents.pageTotal) parts.push('total');
    if (this.contents.pageSizes) parts.push('sizes');
    if (this.contents.pagePrevNext) {
      parts.push('prev');
      if (this.contents.pagePager) parts.push('pager');
      parts.push('next');
    }
    if (this.contents.pageJumper) parts.push('jumper');
    this.layouts = parts.join();
    this.contents.pageEachNum = 10;
  },
};

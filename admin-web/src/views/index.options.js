import IndexHeader from '@/components/index/IndexHeader';
import IndexAside from '@/components/index/IndexAsideStatic';
import IndexMain from '@/components/index/IndexMain';
export default {
  data() {
    return { navigationOpen: false };
  },
  watch: {
    $route() {
      this.navigationOpen = false;
    },
  },
  components: {
    IndexHeader,
    IndexAside,
    IndexMain,
  },
};

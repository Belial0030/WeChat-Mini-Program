package com.service.location;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.entity.ConfigEntity;
import com.service.ConfigService;
import com.utils.BaiduUtil;
import com.utils.R;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 地理位置查询。
 */
@Service
public class LocationApplicationService {
	@Autowired
	private ConfigService configService;

	private static String BAIDU_DITU_AK = null;

    /** location。 */
    public R location(String lng,String lat){
		if(BAIDU_DITU_AK==null) {
			BAIDU_DITU_AK = configService.selectOne(new EntityWrapper<ConfigEntity>().eq("name", "baidu_ditu_ak")).getValue();
			if(BAIDU_DITU_AK==null) {
				return R.error("请在配置管理中正确配置baidu_ditu_ak");
			}
		}
		Map<String, String> map = BaiduUtil.getCityByLonLat(BAIDU_DITU_AK, lng, lat);
		return R.ok().put("data", map);
	}

}

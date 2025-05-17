package top.naccl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.naccl.bean.DiningCarDTO;
import top.naccl.dao.DiningCarRepository;
import top.naccl.bean.DiningCar;
import top.naccl.bean.Food;
import top.naccl.bean.User;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 点餐管理操作实现类
 * @Author: Naccl
 * @Date: 2020-05-18
 */

@Service
public class DiningCarServiceImpl implements DiningCarService {
	@Autowired
	DiningCarRepository diningCarRepository;

	@Override
	public List<Food> getUserFoods(Integer id) {
		return diningCarRepository.findByUserId(id);
	}

	@Override
	public Page<Food> getUserFoods(Integer id, Pageable pageable) {
		return diningCarRepository.findByUserId(id, pageable);
	}

	@Override
	public Map<User, List<Food>> getOrders() {
		List<DiningCar> diningCars = diningCarRepository.findGroupUser();
		Map<User, List<Food>> map = new LinkedHashMap<>();
		for (DiningCar diningCar : diningCars) {
			if (diningCar.getUser() == null) {
				continue;
			}
			List<Food> foods = getUserFoods(diningCar.getUser().getId());
			Food total = new Food();
			total.setName("合计");
			total.setPrice(diningCarRepository.sumPrice(diningCar.getUser().getId()));
			total.setComment(-1);
			foods.add(total);
			map.put(diningCar.getUser(), foods);
		}
		return map;
	}

	@Override
	public List<String[]> getOrdersV2() {
		List<String[]> result = diningCarRepository.findOrderUser();
		return result;
	}

	@Transactional
	@Override
	public DiningCar saveDiningCar(DiningCar diningCar) {
		return diningCarRepository.save(diningCar);
	}

	@Transactional
	@Override
	public void deleteDiningCarByUserIdAndFoodId(Integer userId, Integer foodId) {
		diningCarRepository.deleteByUserIdAndFoodId(userId, foodId);
	}

	@Override
	public DiningCar getDriverCarByFoodId(Integer foodId, Integer userId) {
		return diningCarRepository.findByUserIdAndFoodId(userId, foodId);
	}
}

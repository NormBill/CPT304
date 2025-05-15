package top.naccl.controller.user;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import top.naccl.annotation.OnlyUser;
import top.naccl.bean.*;
import top.naccl.dao.OrderRepository;
import top.naccl.service.DiningCarService;
import top.naccl.service.FoodService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/user")
//@OnlyUser
public class DiningCarController {
	@Autowired
	DiningCarService diningCarService;

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	FoodService foodService;

	/**
	 * 查看点餐车，接收GET和POST(分页load方法需要POST)
	 */
	@RequestMapping("/diningcar")
	public String DiningCar(@PageableDefault(size = 5, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
	                        Model model, HttpSession session, HttpServletRequest request) {
		User user = (User) session.getAttribute("user");
		model.addAttribute("page", diningCarService.getUserFoods(user.getId(), pageable));
		if ("POST".equals(request.getMethod())) {
			return "user/diningcar :: foodList";
		}
		return "user/diningcar";
	}



	@RequestMapping("/orderInfo")
	public String Order(@PageableDefault(size = 5, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
							Model model, HttpSession session, HttpServletRequest request) {
		User user = (User) session.getAttribute("user");
		List<OrderInfoDTO> dtoList = new ArrayList<>();
		List<OrderInfo> orderInfoAll = orderRepository.getOrderInfoAll(user.getId());
		for (OrderInfo orderInfo : orderInfoAll) {
			Food food = foodService.getFood(orderInfo.getFoodId());
			OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
			orderInfoDTO.setFoodName(food.getName());
			orderInfoDTO.setPrice(food.getPrice());
			BeanUtils.copyProperties(orderInfo,orderInfoDTO);
			dtoList.add(orderInfoDTO);
		}
		model.addAttribute("page", dtoList);
		if ("POST".equals(request.getMethod())) {
			return "user/diningcar :: foodList";
		}
		return "user/orderInfo";
	}


	/**
	 * 从点餐车删除菜品
	 */
	@PostMapping("/del")
	@ResponseBody
	public JSONObject addFoodToCar(@RequestParam Integer id, HttpSession session) {
		JSONObject result = new JSONObject();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			result.put("success", false);
			result.put("message", "登录已失效，请重新登录！");
		} else {
			diningCarService.deleteDiningCarByUserIdAndFoodId(user.getId(), id);
			result.put("success", true);
			result.put("message", "移出点餐车成功！");
		}
		return result;
	}
}

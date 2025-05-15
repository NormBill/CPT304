package top.naccl.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import top.naccl.bean.OrderInfo;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderInfo, Integer> {

    @Modifying
    @Transactional
    @Query("update OrderInfo f set f.rating = :rating, f.comment = :comment where f.id = :id")
    int updateById(@Param("rating") String rating, @Param("comment") String comment, @Param("id") Integer id);


    @Query("select o from OrderInfo o  where o.userId = ?1")
    List<OrderInfo> getOrderInfoAll(Integer id);


}

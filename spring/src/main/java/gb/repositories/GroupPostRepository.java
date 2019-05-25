package gb.repositories;

import gb.domain.GroupPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupPostRepository extends JpaRepository<GroupPost, Long> {
    List<GroupPost> findByGroupIdentifier(String id);

    GroupPost findByGroupSequence(String gp_id);

}
